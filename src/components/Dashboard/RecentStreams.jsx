import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import { styles } from '../../styles/dashboardStyles';

export function RecentStreams({ streams }) {
  if (streams.length === 0) {
    return null;
  }

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Recent Sources</h3>
      <div style={styles.streamsList}>
        {streams.slice(0, 5).map(stream => (
          <div key={stream.id} style={styles.streamItem}>
            <div style={styles.streamThumbnail}>
              <VideocamIcon style={styles.thumbnailIcon} />
            </div>
            <div style={styles.streamDetails}>
              <div style={styles.streamName}>{stream.name}</div>
              <div style={styles.streamUrl}>{stream.url}</div>
            </div>
            <span className={`badge ${stream.enabled ? 'badge-success' : 'badge-danger'}`}>
              {stream.enabled ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
