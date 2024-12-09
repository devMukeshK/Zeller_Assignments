/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import Navigation from './src/navigation';
import {name as appName} from './app.json';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// Create the client as outlined in the setup guide

const client = new ApolloClient({
  uri:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:9002/'
      : 'http:localhost:9002/',
  cache: new InMemoryCache(),
});
const ZellerApp = () => (
  <ApolloProvider client={client}>
    <Navigation />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => ZellerApp);
