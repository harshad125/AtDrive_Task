import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

// project import
import App from './App.jsx';
import { store } from './store';
import './index.css';

// ==============================|| MAIN - RENDER ||============================== //

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
