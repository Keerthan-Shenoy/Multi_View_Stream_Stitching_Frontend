import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideocamIcon from '@mui/icons-material/Videocam';
import TuneIcon from '@mui/icons-material/Tune';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { styles } from '../styles/headerStyles';

function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Overview', Icon: DashboardIcon },
    { id: 'streams', label: 'Sources', Icon: VideocamIcon },
    { id: 'control', label: 'Studio', Icon: TuneIcon },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <div style={styles.logo}>
            <VideocamIcon style={styles.logoIcon} />
            <h1 style={styles.logoText}>StreamHub</h1>
          </div>
        </div>
        
        <nav style={styles.nav}>
          {tabs.map(tab => {
            const { Icon } = tab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.navButton,
                  ...(activeTab === tab.id ? styles.navButtonActive : {})
                }}
              >
                <Icon style={styles.tabIcon} />
                <span style={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={styles.rightSection}>
          <div style={styles.statusIndicator}>
            <FiberManualRecordIcon style={styles.statusDot} />
            <span style={styles.statusText}>Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;