import Footer from 'components/Footer';
import Header from 'components/Header';
import AppRoutes from 'router/AppRoutes';
import 'style/style.scss'

function App() {
  return (
    <div className="App">
      <Header />
        <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
