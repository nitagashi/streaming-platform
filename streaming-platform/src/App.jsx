import Footer from 'components/Footer';
import Header from 'components/Header';
import Router from 'router/Router';
import 'style/style.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
