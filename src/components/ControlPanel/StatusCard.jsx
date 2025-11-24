import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { getLayoutString } from '../../utils/validation';
import { styles } from '../../styles/controlPanelStyles';

export function StatusCard({ stitchStatus, enabledStreams, totalStreams, config }) {
  // Calculate layout based on enabled streams if not running, otherwise use the running config
  const displayLayout = stitchStatus?.isRunning 
    ? stitchStatus?.config?.layout 
    : getLayoutString(enabledStreams);
    
  return (
    <div style={styles.statusCard}>
      <div style={styles.statusHeader}>
        <h3 style={styles.sectionTitle}>Current Status</h3>
        <span className={`badge ${stitchStatus?.isRunning ? 'badge-success' : 'badge-danger'}`} style={styles.statusBadge}>
          {stitchStatus?.isRunning ? (
            <><FiberManualRecordIcon style={{fontSize: '10px', marginRight: '4px'}} /> Live</>
          ) : (
            <><RadioButtonUncheckedIcon style={{fontSize: '10px', marginRight: '4px'}} /> Offline</>
          )}
        </span>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Active Sources</span>
          <span style={styles.statValue}>{enabledStreams} / {totalStreams}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Layout</span>
          <span style={styles.statValue}>{displayLayout}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Resolution</span>
          <span style={styles.statValue}>{stitchStatus?.config?.resolution || config.resolution}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Output</span>
          <span style={styles.statValue}>
            {((stitchStatus?.config?.outputFormat || config.outputFormat) + '').toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
