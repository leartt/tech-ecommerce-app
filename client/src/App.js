import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Shop from './pages/Shop/Shop';
import SingleProduct from './components/Product/SingleProduct';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from 'pages/Auth/Login';
import GuestRoute from 'GuestRoute';
import ProtectedRoute from 'ProtectedRoute';
import Signup from 'pages/Auth/Signup';
import PaymentSuccess from 'components/Payment/PaymentSuccess';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'redux/actions/authActions';
import Orders from 'components/Orders/Orders';
import OrderDetails from 'components/Orders/OrderDetails';
import MyProfile from 'pages/MyProfile/MyProfile';
import Products from 'components/Product/Products';
import ProductForm from 'components/Product/ProductForm';
import CreateProduct from 'components/Product/CreateProduct';
import EditProduct from 'components/Product/EditProduct';

function App() {

   const dispatch = useDispatch();
   const user = useSelector(state => state.auth.user);
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

   useEffect(() => {
      if (!user && isLoggedIn) {
         dispatch(getProfile());
      }
   }, [])

   return (
      <div className="App">
         <Router>
            <Header />
            <Switch>
               <Route exact path="/" component={Home} />
               <GuestRoute path="/login" component={Login} />
               <GuestRoute path="/signup" component={Signup} />
               <ProtectedRoute path="/my-profile" component={MyProfile} />
               <Route path="/shop" component={Shop} />
               <Route path="/cart" component={Cart} />
               <Route path="/payment/success" component={PaymentSuccess} />
               <ProtectedRoute path="/checkout" component={Checkout} />
               <ProtectedRoute exact path="/orders" component={Orders} />
               <ProtectedRoute exact path="/orders/:id" component={OrderDetails} />
               <Route exact path="/products" component={Products} />
               <Route exact path="/products/:id" component={SingleProduct} />
               <Route exact path="/product/create" component={CreateProduct} />
               <Route exact path="/product/edit/:id" component={EditProduct} />
            </Switch>
            <Footer />
         </Router>
      </div>
   );
}

export default App;
