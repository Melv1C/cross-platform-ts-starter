/**
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

// Create a client
const queryClient = new QueryClient();

// Wrap the app with QueryClientProvider
const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
