import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import { styles } from '../../styles/streamManagerStyles';
import { StreamCard } from './StreamCard';

export function StreamList({ streams, onTest, onToggle, onDelete }) {
  if (streams.length === 0) {
    return (
      <div style={styles.emptyState}>
        <VideocamIcon style={styles.emptyIcon} />
        <h3 style={styles.emptyTitle}>No sources configured</h3>
        <p style={styles.emptyText}>Add your first video source to get started</p>
      </div>
    );
  }

  return (
    <div style={styles.streamList}>
      {streams.map(stream => (
        <StreamCard
          key={stream.id}
          stream={stream}
          onTest={onTest}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
