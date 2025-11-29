import React, { useState } from 'react';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { fetchStreams, createStream, deleteStream, testStream, updateStream } from '../utils/api';
import { getInitialStreamFormData } from '../utils/validation';
import { styles } from '../styles/streamManagerStyles';
import { StreamForm } from './StreamManager/StreamForm';
import { StreamList } from './StreamManager/StreamList';

function StreamManager({ streams, setStreams }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(getInitialStreamFormData());

  async function refreshStreams() {
    try {
      const data = await fetchStreams();
      setStreams(data);
    } catch (error) {
      toast.error('Failed to fetch streams');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createStream(formData);
      toast.success('Source added successfully');
      setFormData(getInitialStreamFormData());
      setShowAddForm(false);
      refreshStreams();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add source');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this source?')) return;
    
    try {
      await deleteStream(id);
      toast.success('Source deleted successfully');
      refreshStreams();
    } catch (error) {
      toast.error('Failed to delete source');
    }
  }

  async function handleTest(id) {
    const loadingToast = toast.loading('Testing source...');
    try {
      const response = await testStream(id);
      toast.dismiss(loadingToast);
      if (response.data.success) {
        toast.success('Source is accessible');
      } else {
        toast.error('Source is not accessible');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to test source');
    }
  }

  async function toggleEnabled(stream) {
    try {
      await updateStream(stream.id, {
        ...stream,
        enabled: !stream.enabled,
      });
      toast.success(`Source ${!stream.enabled ? 'enabled' : 'disabled'}`);
      refreshStreams();
    } catch (error) {
      toast.error('Failed to update source');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Video Sources</h2>
          <p style={styles.subtitle}>Manage your input streams</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
          style={styles.addButton}
        >
          {showAddForm ? (
            <>
              <CloseIcon style={{fontSize: '18px'}} /> Cancel
            </>
          ) : (
            <>
              <AddIcon style={{fontSize: '18px'}} /> Add Source
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <StreamForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <StreamList
        streams={streams}
        onTest={handleTest}
        onToggle={toggleEnabled}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default StreamManager;