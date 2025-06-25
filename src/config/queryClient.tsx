import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: 1,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            networkMode: 'offlineFirst',
        },
        mutations: {
            networkMode: 'offlineFirst',
            retry: 2,
        },
    },
});

export default queryClient;