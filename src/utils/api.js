import axios from 'axios';

const serverUrl = import.meta.env.BACKEND_SERVER_URL;

// Stream API functions
export async function fetchStreams() {
  const response = await axios.get(`${serverUrl}/api/streams`);
  return response.data.data;
}

export async function createStream(streamData) {
  const response = await axios.post(`${serverUrl}/api/streams`, streamData);
  return response.data;
}

export async function updateStream(streamId, streamData) {
  const response = await axios.put(`${serverUrl}/api/streams/${streamId}`, streamData);
  return response.data;
}

export async function deleteStream(streamId) {
  const response = await axios.delete(`${serverUrl}/api/streams/${streamId}`);
  return response.data;
}

export async function testStream(streamId) {
  const response = await axios.post(`${serverUrl}/api/streams/${streamId}/test`);
  return response.data;
}

// Stitch API functions
export async function fetchStitchStatus() {
  const response = await axios.get(`${serverUrl}/api/stitch/status`);
  return response.data.data;
}

export async function startStitch(config) {
  const response = await axios.post(`${serverUrl}/api/stitch/start`, config);
  return response.data.data;
}

export async function stopStitch() {
  const response = await axios.post(`${serverUrl}/api/stitch/stop`);
  return response.data;
}

export async function captureSnapshot() {
  const response = await axios.post(`${serverUrl}/api/stitch/snapshot`);
  return response.data.data;
}

export async function fetchLayouts() {
  const response = await axios.get(`${serverUrl}/api/stitch/layouts`);
  return response.data.data;
}

// System Health API functions
export async function fetchSystemHealth() {
  const response = await axios.get(`${serverUrl}/api/health/system`);
  return response.data;
}
