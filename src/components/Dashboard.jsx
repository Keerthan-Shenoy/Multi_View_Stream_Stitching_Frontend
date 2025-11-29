import React from 'react';
import { useSystemHealth } from '../hooks/useSystemHealth';
import { getStreamCounts } from '../utils/formatters';
import { styles } from '../styles/dashboardStyles';
import { StatCards } from './Dashboard/StatCards';
import { SystemResources } from './Dashboard/SystemResources';
import { RecentStreams } from './Dashboard/RecentStreams';

function Dashboard({ streams, stitchStatus }) {
  const { systemHealth, loading } = useSystemHealth();

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
      </div>
    );
  }

  const { activeStreams, totalStreams } = getStreamCounts(streams);

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>System Overview</h2>
        <p style={styles.pageSubtitle}>Monitor your streaming infrastructure</p>
      </div>

      <StatCards 
        totalStreams={totalStreams}
        activeStreams={activeStreams}
        stitchStatus={stitchStatus}
        systemHealth={systemHealth}
      />

      <SystemResources systemHealth={systemHealth} />

      <RecentStreams streams={streams} />
    </div>
  );
}

export default Dashboard;