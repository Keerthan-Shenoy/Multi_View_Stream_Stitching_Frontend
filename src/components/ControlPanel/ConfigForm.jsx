import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getLayoutString } from '../../utils/validation';
import { styles } from '../../styles/controlPanelStyles';

export function ConfigForm({ config, setConfig, layouts, isRunning, streams }) {
  const enabledStreams = streams ? streams.filter(s => s.enabled) : [];
  const calculatedLayout = getLayoutString(enabledStreams.length);
  
  return (
    <div style={styles.configCard}>
      <h3 style={styles.sectionTitle}>Processing Configuration</h3>
      
      <div style={styles.configGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Layout Grid</label>
          <div style={{
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            color: '#333'
          }}>
            {calculatedLayout} ({enabledStreams.length} {enabledStreams.length === 1 ? 'stream' : 'streams'})
          </div>
          <small style={{fontSize: '12px', color: '#666', marginTop: '4px', display: 'block'}}>
            Auto-calculated based on enabled streams
          </small>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Resolution</label>
          <select
            value={config.resolution}
            onChange={(e) => setConfig({ ...config, resolution: e.target.value })}
            disabled={isRunning}
          >
            <option value="1920x1080">1920x1080 (Full HD)</option>
            <option value="1280x720">1280x720 (HD)</option>
            <option value="960x540">960x540 (qHD)</option>
            <option value="640x360">640x360 (Low)</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Frame Rate</label>
          <select
            value={config.framerate}
            onChange={(e) => setConfig({ ...config, framerate: parseInt(e.target.value) })}
            disabled={isRunning}
          >
            <option value="60">60 FPS</option>
            <option value="30">30 FPS</option>
            <option value="25">25 FPS</option>
            <option value="24">24 FPS</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bitrate</label>
          <select
            value={config.bitrate}
            onChange={(e) => setConfig({ ...config, bitrate: e.target.value })}
            disabled={isRunning}
          >
            <option value="6000k">6000 kbps (High)</option>
            <option value="4000k">4000 kbps (Medium)</option>
            <option value="2000k">2000 kbps (Low)</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Output Format</label>
          <select
            value={config.outputFormat}
            onChange={(e) => setConfig({ ...config, outputFormat: e.target.value })}
            disabled={isRunning}
          >
            <option value="hls">HLS Only</option>
            <option value="srt">SRT Only</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Audio Source</label>
          <select
            value={config.audioStreamId || ''}
            onChange={(e) => setConfig({ ...config, audioStreamId: e.target.value || null })}
            disabled={isRunning}
          >
            <option value="">No Audio</option>
            {enabledStreams.map(stream => (
              <option key={stream.id} value={stream.id}>
                {stream.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isRunning && (
        <div style={styles.warningBox}>
          <WarningAmberIcon style={{fontSize: '16px', marginRight: '8px', verticalAlign: 'middle'}} />
          Stop processing to modify configuration
        </div>
      )}
    </div>
  );
}
