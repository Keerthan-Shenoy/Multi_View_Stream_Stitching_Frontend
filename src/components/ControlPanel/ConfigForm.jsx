import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { styles } from '../../styles/controlPanelStyles';

export function ConfigForm({ config, setConfig, layouts, isRunning }) {
  return (
    <div style={styles.configCard}>
      <h3 style={styles.sectionTitle}>Processing Configuration</h3>
      
      <div style={styles.configGrid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Layout Grid</label>
          <select
            value={config.layout}
            onChange={(e) => setConfig({ ...config, layout: e.target.value })}
            disabled={isRunning}
          >
            {layouts.map(layout => (
              <option key={layout.id} value={layout.id}>
                {layout.name} ({layout.maxStreams} sources)
              </option>
            ))}
          </select>
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
            <option value="both">Both (HLS + SRT)</option>
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
