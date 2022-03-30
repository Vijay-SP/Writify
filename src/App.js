/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { Route, Switch } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import ShayariPage from './pages/ShayariPage';
import QuotePage from './pages/QuotePage';
import { AnimatePresence } from 'framer-motion';
import KavitaPage from './pages/KavitaPage';
import Shayri from './pages/Shayri';
import Quotes from './pages/Quotes';
import Kavita from './pages/Kavita';
import Blog from './pages/Blog';
import SignUp from './components/forms/SignUp';
import LogIn from './components/forms/LogIn';
import ForgetPassword from './components/forms/ForgetPassword';
import UserProfile from './pages/UserProfile';
import Approvals from './pages/Approvals';
import KavitaApprovals from './pages/approvals/KavitaApprovals';
import QuoteApprovals from './pages/approvals/quoteApproval';
import ShayriApprovals from './pages/approvals/ShayriApproval';
import BlogApprovals from './pages/approvals/BlogApprovals';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import about from './components/About/about';
import Contact1 from './components/Contact/Contacts';
import { Flag } from 'react-bootstrap-icons';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Reports from './pages/Reports';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <AnimatePresence>
      <Switch>
        <Route path="/blogs/:id" component={Blog} />
        <Route path="/kavitas/:id" component={Kavita} />
        <Route path="/quotes/:id" component={Quotes} />
        <Route path="/shayaris/:id" component={Shayri} />
        <Route path="/quotes" component={QuotePage} />
        <Route path="/kavitas" component={KavitaPage} />
        <Route path="/shayaris" component={ShayariPage} />
        <Route path="/blogs" component={BlogPage} />
        <Route path="/resetpassword" component={ForgetPassword} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/about" component={about} />
        <Route path="/contact" component={Contact1} />
        <Route exact path="/" component={HomePage} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/approvals/blogs/:id" component={BlogApprovals} />
        <Route path="/approvals/shayris/:id" component={ShayriApprovals} />
        <Route path="/approvals/quotes/:id" component={QuoteApprovals} />
        <Route path="/approvals/kavitas/:id" component={KavitaApprovals} />

        <ProtectedRoute
          path="/approvals"
          component={Approvals}
          auth={currentUser ? true : false}
        />
        <ProtectedRoute
          path="/reports"
          component={Reports}
          auth={currentUser ? true : false}
        />
        <ProtectedRoute
          path="/edituser/:id"
          component={EditProfile}
          auth={currentUser ? true : false}
        />
        <ProtectedRoute
          path="/users/:id"
          component={UserProfile}
          auth={currentUser ? true : false}
        />
      </Switch>
    </AnimatePresence>
  );
};

export default App;
