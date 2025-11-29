import React from 'react';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styles } from '../../styles/controlPanelStyles';

export function Controls({ 
  isRunning, 
  loading, 
  enabledStreams, 
  outputFormat,
  onStart, 
  onStop, 
  onSnapshot 
}) {
  return (
    <>
      <div style={styles.controls}>
        {!isRunning ? (
          <button
            onClick={onStart}
            disabled={loading || enabledStreams === 0}
            className="btn btn-success"
            style={styles.btnLarge}
          >
            {loading ? (
              <><HourglassEmptyIcon style={{fontSize: '18px'}} /> Starting...</>
            ) : (
              <><PlayArrowIcon style={{fontSize: '18px'}} /> Start Processing</>
            )}
          </button>
        ) : (
          <>
            <button
              onClick={onStop}
              disabled={loading}
              className="btn btn-danger"
              style={styles.btnLarge}
            >
              {loading ? (
                <><HourglassEmptyIcon style={{fontSize: '18px'}} /> Stopping...</>
              ) : (
                <><StopIcon style={{fontSize: '18px'}} /> Stop Processing</>
              )}
            </button>
            {(outputFormat === 'hls' || outputFormat === 'both') && (
              <button
                onClick={onSnapshot}
                className="btn btn-primary"
                style={styles.btnLarge}
              >
                <CameraAltIcon style={{fontSize: '18px'}} /> Capture Frame
              </button>
            )}
          </>
        )}
      </div>

      {enabledStreams === 0 && (
        <div style={styles.infoBox}>
          <InfoOutlinedIcon style={{fontSize: '16px', marginRight: '8px', verticalAlign: 'middle'}} />
          Add and enable at least one source to start processing
        </div>
      )}
    </>
  );
}
