import { io } from 'socket.io-client';

let socketInstance = null;

export function getSocket() {
  if (!socketInstance) {
    socketInstance = io('http://localhost:3000');
  }
  return socketInstance;
}

export function subscribeToStreams() {
  const socket = getSocket();
  socket.emit('subscribe:streams');
}

export function subscribeToStitch() {
  const socket = getSocket();
  socket.emit('subscribe:stitch');
}

export function onStreamAdded(callback) {
  const socket = getSocket();
  socket.on('stream:added', callback);
  return () => socket.off('stream:added', callback);
}

export function onStreamUpdated(callback) {
  const socket = getSocket();
  socket.on('stream:updated', callback);
  return () => socket.off('stream:updated', callback);
}

export function onStreamDeleted(callback) {
  const socket = getSocket();
  socket.on('stream:deleted', callback);
  return () => socket.off('stream:deleted', callback);
}

export function onStitchStarted(callback) {
  const socket = getSocket();
  socket.on('stitch:started', callback);
  return () => socket.off('stitch:started', callback);
}

export function onStitchStopped(callback) {
  const socket = getSocket();
  socket.on('stitch:stopped', callback);
  return () => socket.off('stitch:stopped', callback);
}

export function onConnect(callback) {
  const socket = getSocket();
  socket.on('connect', callback);
  return () => socket.off('connect', callback);
}

export function cleanupSocketListeners() {
  const socket = getSocket();
  socket.off('connect');
  socket.off('stream:added');
  socket.off('stream:updated');
  socket.off('stream:deleted');
  socket.off('stitch:started');
  socket.off('stitch:stopped');
}
