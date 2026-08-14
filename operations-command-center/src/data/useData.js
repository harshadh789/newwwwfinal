import { useState, useEffect } from 'react';
import { demoData } from './mockData';

export function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for fetching data
    const timer = setTimeout(() => {
      setData(demoData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}
