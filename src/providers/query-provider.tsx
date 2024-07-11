'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
    return new QueryClient();
}

function getQueryClient() {
    // we are on server
    if (typeof window === 'undefined') {
        return makeQueryClient();
    } else {
        // on client
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }

        return browserQueryClient;
    }
}
const queryClient = getQueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
