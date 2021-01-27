import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Shop from './pages/Shop/Shop';
import SingleProduct from './components/Product/SingleProduct';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/products/:id" component={SingleProduct} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
