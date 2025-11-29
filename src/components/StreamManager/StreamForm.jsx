import React from 'react';
import { styles } from '../../styles/streamManagerStyles';

export function StreamForm({ formData, setFormData, onSubmit, onCancel }) {
  return (
    <div style={styles.formCard} className="fade-in">
      <h3 style={styles.formTitle}>Add New Source</h3>
      <form onSubmit={onSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Source Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Camera 1"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Stream URL</label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="srt://example.com:10024?mode=caller"
              required
            />
            <small style={styles.hint}>
              Supports: RTMP, RTSP, HLS, HTTP, SRT<br/>
              <strong>Note:</strong> For SRT streams, add <code>?mode=caller</code> (e.g., srt://ip:port?mode=caller)<br/>
              SRT streams allow only ONE receiver at a time. Stop ffplay/other players before processing.
            </small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              />
              <span>Enable source immediately</span>
            </label>
          </div>
        </div>

        <div style={styles.formActions}>
          <button type="submit" className="btn btn-success">
            Add Source
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
