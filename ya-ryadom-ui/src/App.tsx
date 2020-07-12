import React from 'react';
import RootLayout from './components/root-layout';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { AppState } from './store/app-state';

interface AppProps {
  store: Store<AppState>
}

const App: React.FC<AppProps> = ({ store }) => {
  return (
    <Provider store={store}>
      <RootLayout></RootLayout>
    </Provider>
  );
}

export default App;
