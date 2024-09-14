import Footer from 'components/Footer';
import Header from 'components/Header';
import AppRoutes from 'router/AppRoutes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client';
import 'style/style.scss'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000', // Your GraphQL server URL
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Header />
        <AppRoutes />
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
