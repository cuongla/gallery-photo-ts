import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Pages
import Header from './components/sections/Header';
import HomePage from './components/pages/HomePage';
import SignUpPage from './components/pages/SignUp';
import SignInPage from './components/pages/SignIn';
import ForgotPasswordPage from './components/pages/ForgotPassword';
import DashboardPage from './components/pages/Dashboard';

// Routes
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import Loader from './components/shared/Loader';
import './App.css';

// Redux and Firebase
import firebase from './firebase/config';
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import { RootState } from './store';


const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));

        // email verification
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }

      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <Header />
      <Switch>
        <PublicRoute
          path="/" component={HomePage} exact />
        <PublicRoute
          path="/signup" component={SignUpPage} exact />
        <PublicRoute
          path="/signin" component={SignInPage} exact />
        <PublicRoute
          path="/forgot-password" component={ForgotPasswordPage} exact />
        <PrivateRoute
          path="/dashboard" component={DashboardPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
