import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
// import Product from './product';
import Footer from './components/Footer';
import { Provider } from "react-redux";
import { store } from './redux/store';
import Navbar from './components/Navbar'
import SingleProduct from "./pages/SingleProduct";
import LoginModal from './components/LoginModal'
import Cart from './components/Cart'

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

{/* <BrowserRouter>
        <div>
          <Provider store={store}>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </Provider>
        </div>
      </BrowserRouter> */}