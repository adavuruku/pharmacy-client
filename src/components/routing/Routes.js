import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../Alert';
import LoginSignUp from '../auth/LoginSignUp';
import Landing from '../layout/Landing';
import CheckOut from '../checkout/CheckOut';
import WishList from '../wishlist/WishList';
import CheckOutTwo from '../checkout/CheckOutTwo';
import PrivateRoute from '../routing/PrivateRoute';
// import ProfileForm from '../profile-forms/ProfileForm';

// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
// import NotFound from '../layout/NotFound';


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
        {/* <Route component={NotFound} /> } */}
      </Switch>
      </section>
  );
};

export default Routes;
