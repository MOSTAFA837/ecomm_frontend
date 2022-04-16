import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";

import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Home/Home";
import Contact from "./components/Layout/Contact/Contact";
import About from "./components/Layout/About/About";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import Products from "./components/Product/Products/Products";
import Search from "./components/Product/Search/Search";
import LoginSignup from "./components/User/LoginSignup/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/Layout/Header/UserOptions";
import Profile from "./components/User/Profile/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/shipping/Shipping";
import OrderSuccess from "./components/cart/orderSuccess/OrderSuccess";
import ConfirmOrder from "./components/cart/confirmOrder/ConfirmOrder";
import Payment from "./components/cart/payment/Payment";
import MyOrders from "./components/Order/myOrders/MyOrders";
import OrderDetails from "./components/Order/orderDetails/OrderDetails";
import Dashboard from "./components/Admin/dashboard/Dashboard";
import ProductList from "./components/Admin/productList/ProductList";
import NewProduct from "./components/Admin/newProduct/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/orderList/OrderList";
import ProcessOrder from "./components/Admin/processOrder/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/productReviews/ProductReviews";
import NotFound from "./components/Layout/NotFound/NotFound";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignup} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />

        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />

        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
};

export default App;
