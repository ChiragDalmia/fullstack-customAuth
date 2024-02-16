import useSwr from 'swr'
import fetcher from '@/lib/fetcher';
import { useMemo } from 'react';

const useBillboard = (config = {}) => {
  const { data, error, mutate, isValidating } = useSwr('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...config,
  });

  const refresh = () => mutate();

  const state = useMemo(() => ({
    data,
    error,
    isLoading: !error && !data,
    isFetching: isValidating,
    isSuccess: !error && !!data,
    refresh,
  }), [data, error, isValidating, mutate]);

  return state;
};

export default useBillboard;
