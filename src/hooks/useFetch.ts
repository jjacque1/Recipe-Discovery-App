// src/hooks/useFetch.ts
import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    let isMounted = true; // prevents state updates after unmount

    async function fetchData() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = (await res.json()) as T;

        if (isMounted) {
          setState({ data: json, loading: false, error: null });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        if (isMounted) {
          setState({ data: null, loading: false, error: message });
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state; // { data, loading, error }
}
