import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute() {
  const { user, loading, error, login, signUp, logout } = useAuth();
  console.log(user)
  // if (loading) {
  if (false) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>Loading....</p>
      </div>
    );
  }
  // return user ? <Outlet /> : <Navigate to="/login" />;
  return !!user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
