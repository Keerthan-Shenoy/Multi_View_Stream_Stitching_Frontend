import { useState, useEffect } from 'react';
import { fetchSystemHealth } from '../utils/api';

export function useSystemHealth() {
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSystemHealth() {
      try {
        const data = await fetchSystemHealth();
        setSystemHealth(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching system health:', err);
        setError(err);
        setLoading(false);
      }
    }

    loadSystemHealth();
    const interval = setInterval(loadSystemHealth, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return { systemHealth, loading, error };
}
