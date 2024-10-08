import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import Footer from './components/Footer';
import { Provider } from "react-redux";
import { store } from './redux/store';
import Navbar from './components/Navbar'
import SingleProduct from "./pages/SingleProduct";
import LoginModal from './components/LoginModal';
import Cart from './components/Cart';

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productID" element={<SingleProduct />} />
        </Routes>
        <Footer />
        <Cart />
        <LoginModal />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
