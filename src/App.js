import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import Product from './product';
import Cart from './cart';
import Navbar from './navbar';
import Footer from './footer';
import { Provider } from "react-redux";
import { store } from './redux/store';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
