import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchStitchStatus, fetchLayouts, startStitch, stopStitch, captureSnapshot } from '../utils/api';
import { getInitialStitchConfig } from '../utils/validation';
import { getStreamCounts, copyToClipboard } from '../utils/formatters';
import { styles } from '../styles/controlPanelStyles';
import { StatusCard } from './ControlPanel/StatusCard';
import { OutputUrls } from './ControlPanel/OutputUrls';
import { ConfigForm } from './ControlPanel/ConfigForm';
import { Controls } from './ControlPanel/Controls';

function ControlPanel({ streams, stitchStatus, setStitchStatus }) {
  const [config, setConfig] = useState(getInitialStitchConfig());
  const [layouts, setLayouts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLayouts();
    loadStitchStatus();
  }, []);

  async function loadLayouts() {
    try {
      const data = await fetchLayouts();
      setLayouts(data);
    } catch (error) {
      console.error('Error fetching layouts:', error);
      toast.error('Failed to load layouts');
    }
  }

  async function loadStitchStatus() {
    try {
      const data = await fetchStitchStatus();
      setStitchStatus(data);
      if (data.config) {
        setConfig(data.config);
      }
    } catch (error) {
      console.error('Error fetching stitch status:', error);
    }
  }

  async function handleStartStitch() {
    setLoading(true);
    try {
      const data = await startStitch(config);
      toast.success('Processing started successfully!');
      setStitchStatus(data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to start processing');
    } finally {
      setLoading(false);
    }
  }

  async function handleStopStitch() {
    setLoading(true);
    try {
      await stopStitch();
      toast.success('Processing stopped');
      loadStitchStatus();
    } catch (error) {
      toast.error('Failed to stop processing');
    } finally {
      setLoading(false);
    }
  }

  async function handleSnapshot() {
    try {
      const data = await captureSnapshot();
      toast.success('Snapshot captured!');
      window.open(data.url, '_blank');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to capture snapshot');
    }
  }

  function handleCopy(text, label) {
    copyToClipboard(text, toast, label);
  }

  if (!streams || !stitchStatus) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
      </div>
    );
  }

  const { activeStreams, totalStreams } = getStreamCounts(streams);

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>Production Studio</h2>
        <p style={styles.pageSubtitle}>Configure and control video processing</p>
      </div>

      <StatusCard 
        stitchStatus={stitchStatus}
        enabledStreams={activeStreams}
        totalStreams={totalStreams}
        config={config}
      />

      {stitchStatus?.isRunning && stitchStatus?.outputUrls && (
        <OutputUrls 
          outputUrls={stitchStatus.outputUrls}
          onCopy={handleCopy}
        />
      )}

      <ConfigForm 
        config={config}
        setConfig={setConfig}
        layouts={layouts}
        isRunning={stitchStatus?.isRunning}
      />

      <Controls 
        isRunning={stitchStatus?.isRunning}
        loading={loading}
        enabledStreams={activeStreams}
        outputFormat={config.outputFormat}
        onStart={handleStartStitch}
        onStop={handleStopStitch}
        onSnapshot={handleSnapshot}
      />
    </div>
  );
}

export default ControlPanel;