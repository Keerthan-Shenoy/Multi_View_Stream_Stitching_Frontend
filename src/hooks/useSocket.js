import { useState, useEffect } from 'react';
import { 
  onConnect, 
  onStreamAdded, 
  onStreamUpdated, 
  onStreamDeleted,
  onStitchStarted,
  onStitchStopped,
  subscribeToStreams,
  subscribeToStitch,
  cleanupSocketListeners
} from '../utils/socket';

export function useSocket(streams, setStreams, setStitchStatus) {
  useEffect(() => {
    const unsubscribeConnect = onConnect(() => {
      console.log('Connected to server');
      subscribeToStreams();
      subscribeToStitch();
    });

    const unsubscribeStreamAdded = onStreamAdded((stream) => {
      setStreams(prev => [...prev, stream]);
    });

    const unsubscribeStreamUpdated = onStreamUpdated((updatedStream) => {
      setStreams(prev => prev.map(s => s.id === updatedStream.id ? updatedStream : s));
    });

    const unsubscribeStreamDeleted = onStreamDeleted(({ id }) => {
      setStreams(prev => prev.filter(s => s.id !== id));
    });

    const unsubscribeStitchStarted = onStitchStarted((data) => {
      setStitchStatus({ ...data, isRunning: true });
    });

    const unsubscribeStitchStopped = onStitchStopped((data) => {
      setStitchStatus(prev => ({ ...prev, isRunning: false }));
    });

    return () => {
      unsubscribeConnect();
      unsubscribeStreamAdded();
      unsubscribeStreamUpdated();
      unsubscribeStreamDeleted();
      unsubscribeStitchStarted();
      unsubscribeStitchStopped();
      cleanupSocketListeners();
    };
  }, [setStreams, setStitchStatus]);
}
