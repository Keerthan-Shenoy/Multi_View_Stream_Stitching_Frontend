import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ComputerIcon from '@mui/icons-material/Computer';
import { styles } from '../../styles/dashboardStyles';

export function StatCards({ totalStreams, activeStreams, stitchStatus, systemHealth }) {
  return (
    <div style={styles.statsGrid}>
      <div style={styles.statCard}>
        <div style={styles.statIconWrapper}>
          <VideocamIcon style={styles.statIcon} />
        </div>
        <div style={styles.statContent}>
          <div style={styles.statLabel}>Total Sources</div>
          <div style={styles.statValue}>{totalStreams}</div>
        </div>
      </div>

      <div style={styles.statCard}>
        <div style={{...styles.statIconWrapper, background: 'linear-gradient(135deg, rgba(11, 163, 96, 0.2), rgba(13, 140, 84, 0.2))'}}>
          <CheckCircleIcon style={{...styles.statIcon, color: '#0ba360'}} />
        </div>
        <div style={styles.statContent}>
          <div style={styles.statLabel}>Active Sources</div>
          <div style={styles.statValue}>{activeStreams}</div>
        </div>
      </div>

      <div style={styles.statCard}>
        <div style={{
          ...styles.statIconWrapper, 
          background: stitchStatus?.isRunning 
            ? 'linear-gradient(135deg, rgba(11, 163, 96, 0.2), rgba(13, 140, 84, 0.2))' 
            : 'linear-gradient(135deg, rgba(170, 170, 170, 0.2), rgba(140, 140, 140, 0.2))'
        }}>
          {stitchStatus?.isRunning ? (
            <PlayArrowIcon style={{...styles.statIcon, color: '#0ba360'}} />
          ) : (
            <PauseIcon style={{...styles.statIcon, color: '#aaaaaa'}} />
          )}
        </div>
        <div style={styles.statContent}>
          <div style={styles.statLabel}>Processing Status</div>
          <div style={styles.statValue}>{stitchStatus?.isRunning ? 'Active' : 'Inactive'}</div>
        </div>
      </div>

      <div style={styles.statCard}>
        <div style={{...styles.statIconWrapper, background: 'linear-gradient(135deg, rgba(249, 171, 0, 0.2), rgba(218, 150, 0, 0.2))'}}>
          <ComputerIcon style={{...styles.statIcon, color: '#f9ab00'}} />
        </div>
        <div style={styles.statContent}>
          <div style={styles.statLabel}>CPU Cores</div>
          <div style={styles.statValue}>{systemHealth?.cpu.cores}</div>
        </div>
      </div>
    </div>
  );
}
