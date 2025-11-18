import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styles } from '../../styles/controlPanelStyles';

export function OutputUrls({ outputUrls, onCopy }) {
  if (!outputUrls || (!outputUrls.hls && !outputUrls.srt)) {
    return null;
  }

  return (
    <div style={styles.outputCard}>
      <h3 style={styles.sectionTitle}>Output Stream URLs</h3>
      
      {outputUrls.hls && (
        <div style={styles.urlBox}>
          <div style={styles.urlHeader}>
            <span style={styles.urlLabel}>HLS Playlist</span>
            <button 
              onClick={() => onCopy(outputUrls.hls, 'HLS URL')}
              className="btn btn-secondary"
              style={styles.copyBtn}
            >
              <ContentCopyIcon style={{fontSize: '14px'}} /> Copy
            </button>
          </div>
          <div style={styles.urlValue}>{outputUrls.hls}</div>
          <div style={styles.urlHint}>
            Compatible with web browsers and media players
          </div>
        </div>
      )}

      {outputUrls.srt && (
        <div style={styles.urlBox}>
          <div style={styles.urlHeader}>
            <span style={styles.urlLabel}>SRT Stream</span>
            <button 
              onClick={() => onCopy(outputUrls.srt, 'SRT URL')}
              className="btn btn-secondary"
              style={styles.copyBtn}
            >
              <ContentCopyIcon style={{fontSize: '14px'}} /> Copy
            </button>
          </div>
          <div style={styles.urlValue}>{outputUrls.srt}</div>
          <div style={styles.urlHint}>
            Low-latency streaming for OBS Studio, VLC, FFmpeg
          </div>
        </div>
      )}
    </div>
  );
}
