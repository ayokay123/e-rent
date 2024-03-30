import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './css/main.css';

import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import { AuthProvider } from './hooks/useAuth';
const Home = React.lazy(() => import('./pages/home/Home'));
const Login = React.lazy(() => import('./pages/login/Login'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const CreateListing = React.lazy(() => import('./pages/create-listing/CreateListing'));
const ListingDetails = React.lazy(() => import('./pages/listing-details/ListingDetails'));
const MyListings = React.lazy(() => import('./pages/MyListings'));
const Category = React.lazy(() => import('./pages/category/Category'));
const SavedListings = React.lazy(() => import('./pages/SavedListings'));

function App() {
  return (
    <div className="App font-sans">
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <ScrollToTop>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/create-listing" element={<PrivateRoute />}>
                  <Route path="/create-listing" element={<CreateListing />} />
                </Route>
                <Route path="/listing/:listingId" element={<ListingDetails />} />
                <Route path="/my-listings" element={<PrivateRoute />}>
                  <Route path="/my-listings" element={<MyListings />} />
                </Route>
                <Route path="/favorites" element={<PrivateRoute />}>
                  <Route path="/favorites" element={<SavedListings />} />
                </Route>
                <Route path="/category/:categoryName" element={<Category />} />
              </Routes>
              <Footer />
            </ScrollToTop>
          </Suspense>
        </Router>

        <ToastContainer position="top-center" />
      </AuthProvider>
    </div>
  );
}

export default App;
