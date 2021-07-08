import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../Alert';
import LoginSignUp from '../auth/LoginSignUp';
import Landing from '../layout/Landing';
import OpenCart from '../layout/OpenCart';
import NotFound from '../layout/NotFound';
import CheckOut from '../checkout/CheckOut';
import WishList from '../wishlist/WishList';
import CheckOutTwo from '../checkout/CheckOutTwo';
import Profile from '../profile/Profile';
import Admin from '../admin/admin';
import Orders from '../orders/Orders';
import PrivateRoute from '../routing/PrivateRoute';
import AdminRoute from '../routing/adminRoute';
import ChatHome from '../chat/ChatHome';
// import ProfileForm from '../profile-forms/ProfileForm';

// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';


const Routes = props => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/home" component={Landing} />
        <Route exact path="/carts" component={CheckOut} />
        <PrivateRoute exact path="/checkout" component={CheckOutTwo} />
        <PrivateRoute exact path="/wishlist" component={WishList} />
        <PrivateRoute exact path="/my/orders" component={Orders} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/chat" component={ChatHome } />
        <AdminRoute exact path="/admin" component={Admin} />
        <PrivateRoute exact path="/products/:inventoryId" component={OpenCart} />
        <Route component={NotFound} />
      </Switch>
      </section>
  );
};

export default Routes;
