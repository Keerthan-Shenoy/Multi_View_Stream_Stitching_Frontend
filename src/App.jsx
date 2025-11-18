import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import StreamManager from './components/StreamManager';
import { fetchStreams, fetchStitchStatus } from './utils/api';
import { useSocket } from './hooks/useSocket';
import { getInitialStitchConfig } from './utils/validation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [streams, setStreams] = useState([]);
  const [stitchStatus, setStitchStatus] = useState({
    isRunning: false,
    config: getInitialStitchConfig(),
    outputUrls: {
      hls: null,
      srt: null,
    },
  });

  useSocket(streams, setStreams, setStitchStatus);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      const [streamsData, statusData] = await Promise.all([
        fetchStreams(),
        fetchStitchStatus()
      ]);
      setStreams(streamsData);
      setStitchStatus(statusData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  return (
    <div className="app">
      <Toaster position="top-right" />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ padding: '20px' }}>
        {activeTab === 'dashboard' && <Dashboard streams={streams} stitchStatus={stitchStatus} />}
        {activeTab === 'streams' && <StreamManager streams={streams} setStreams={setStreams} />}
        {activeTab === 'control' && <ControlPanel streams={streams} stitchStatus={stitchStatus} setStitchStatus={setStitchStatus} />}
      </main>
    </div>
  );
}

export default App;
