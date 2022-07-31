import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dynamic from './Dynamic';

export default function DynamicDemo() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Dynamic />
    </QueryClientProvider>
  );
}
