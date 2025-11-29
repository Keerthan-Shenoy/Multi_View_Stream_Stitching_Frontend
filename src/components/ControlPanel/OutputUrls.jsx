import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styles } from '../../styles/controlPanelStyles';
import HlsPlayer from './HlsPlayer';

export function OutputUrls({ outputUrls, onCopy }) {
  const [showPreview, setShowPreview] = useState(false);
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
          <div style={{display: 'flex', gap: 8, alignItems: 'center', marginTop: 8}}>
            <div style={styles.urlHint}>Compatible with web browsers and media players</div>
            <button
              onClick={() => setShowPreview(prev => !prev)}
              className="btn btn-outline"
              style={{height: 32}}
            >
              {showPreview ? 'Hide Preview' : 'Preview'}
            </button>
          </div>

          {showPreview && (
            <div style={{marginTop: 12}}>
              <HlsPlayer src={outputUrls.hls} height={240} />
            </div>
          )}
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
