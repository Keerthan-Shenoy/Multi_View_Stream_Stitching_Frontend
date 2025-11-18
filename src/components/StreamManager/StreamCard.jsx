import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from '../../styles/streamManagerStyles';

export function StreamCard({ stream, onTest, onToggle, onDelete }) {
  return (
    <div style={styles.streamCard} className="fade-in">
      <div style={styles.streamContent}>
        <div style={styles.streamThumbnail}>
          <VideocamIcon style={styles.thumbnailIcon} />
        </div>
        
        <div style={styles.streamInfo}>
          <h4 style={styles.streamName}>{stream.name}</h4>
          <p style={styles.streamUrl}>{stream.url}</p>
          <div style={styles.streamMeta}>
            <span style={styles.metaItem}>
              <span style={styles.metaLabel}>Position:</span> {stream.position}
            </span>
            {stream.stats?.resolution && (
              <span style={styles.metaItem}>
                <span style={styles.metaLabel}>Resolution:</span> {stream.stats.resolution}
              </span>
            )}
            {stream.url.startsWith('srt://') && (
              <span className="badge badge-info">SRT Stream</span>
            )}
          </div>
        </div>
        
        <div style={styles.streamStatus}>
          <span className={`badge ${stream.enabled ? 'badge-success' : 'badge-danger'}`}>
            {stream.enabled ? 'Active' : 'Inactive'}
          </span>
          {stream.health && (
            <span className={`badge ${
              stream.health === 'healthy' ? 'badge-success' : 
              stream.health === 'unhealthy' ? 'badge-danger' : 'badge-warning'
            }`}>
              {stream.health}
            </span>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div style={styles.streamActions}>
        <button
          onClick={() => onTest(stream.id)}
          className="btn btn-secondary"
          style={styles.actionBtn}
        >
          <SearchIcon style={{fontSize: '16px'}} /> Test
        </button>
        <button
          onClick={() => onToggle(stream)}
          className="btn btn-secondary"
          style={styles.actionBtn}
        >
          {stream.enabled ? (
            <>
              <PauseIcon style={{fontSize: '16px'}} /> Disable
            </>
          ) : (
            <>
              <PlayArrowIcon style={{fontSize: '16px'}} /> Enable
            </>
          )}
        </button>
        <button
          onClick={() => onDelete(stream.id)}
          className="btn btn-danger"
          style={styles.actionBtn}
        >
          <DeleteIcon style={{fontSize: '16px'}} /> Delete
        </button>
      </div>
    </div>
  );
}
