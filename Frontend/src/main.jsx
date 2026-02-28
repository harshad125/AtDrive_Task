import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// project import
import App from './App.jsx';
import { store } from './store';
import './index.css';

const queryClient = new QueryClient();

// ==============================|| MAIN - RENDER ||============================== //

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ReduxProvider>
);
