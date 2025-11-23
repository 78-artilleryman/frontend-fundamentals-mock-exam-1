import { useState, useEffect, useCallback } from 'react';
import { http } from 'tosslib';

interface UseGetOptions {
  maxRetries?: number;
  retryDelay?: number;
  enabled?: boolean;
}

function useGet<T = unknown>(url: string, options?: UseGetOptions) {
  const { maxRetries = 3, retryDelay = 1000, enabled = true } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await http.get<T>(url);
        setData(result);
        setLoading(false);
        return;
      } catch (e) {
        lastError = e instanceof Error ? e : new Error(String(e));

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    setError(lastError);
    setLoading(false);
  }, [url, maxRetries, retryDelay]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return { data, loading, error, refetch: fetchData };
}

export default useGet;
