import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import "./index.css";
import {Provider} from "react-redux";
import store from "./store.js";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: 'if-stale',
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
        }
    }
});

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
              <Provider store={store}>
                    <App />
              </Provider>
      </StrictMode>
    </QueryClientProvider>
)
