import React from 'react';
import { styles } from '../../styles/dashboardStyles';
import { formatUptime, formatLoadAverage } from '../../utils/formatters';

export function SystemResources({ systemHealth }) {
  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>System Resources</h3>
      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h4 style={styles.cardTitle}>Processor</h4>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Model</span>
              <span style={styles.infoValue}>{systemHealth?.cpu.model}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Cores</span>
              <span style={styles.infoValue}>{systemHealth?.cpu.cores}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Load Average</span>
              <span style={styles.infoValue}>
                {formatLoadAverage(systemHealth?.cpu.loadAvg)}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h4 style={styles.cardTitle}>Memory</h4>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Total</span>
              <span style={styles.infoValue}>{systemHealth?.memory.total}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Used</span>
              <span style={styles.infoValue}>{systemHealth?.memory.used}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Available</span>
              <span style={styles.infoValue}>{systemHealth?.memory.free}</span>
            </div>
            <div style={styles.progressBarContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: systemHealth?.memory.usagePercent
                  }}
                />
              </div>
              <span style={styles.progressLabel}>{systemHealth?.memory.usagePercent} utilized</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h4 style={styles.cardTitle}>System Info</h4>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Platform</span>
              <span style={styles.infoValue}>{systemHealth?.system.platform}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Architecture</span>
              <span style={styles.infoValue}>{systemHealth?.system.arch}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Hostname</span>
              <span style={styles.infoValue}>{systemHealth?.system.hostname}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Uptime</span>
              <span style={styles.infoValue}>
                {formatUptime(systemHealth?.system.uptime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
