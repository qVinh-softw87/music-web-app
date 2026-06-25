import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useZingHome() {
  const { data, error, isLoading } = useSWR('/api/zing/home', fetcher, {
    revalidateOnFocus: false,
  });
  return { data, error, isLoading };
}

export function useZingSearch(query: string) {
  const { data, error, isLoading } = useSWR(
    query ? `/api/zing/search?q=${encodeURIComponent(query)}` : null,
    fetcher
  );
  return { data, error, isLoading };
}

export function useZingPlaylist(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/zing/playlist/${id}` : null,
    fetcher
  );
  return { data, error, isLoading };
}

export async function fetchZingSongStream(id: string) {
  const res = await fetch(`/api/zing/song/${id}`);
  return await res.json();
}
