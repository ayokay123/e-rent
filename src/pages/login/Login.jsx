import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FormHeading from '../../components/FormHeading';
import FormCard from '../../layout/FormCard';
import FormContainer from '../../layout/FormContainer';
import LoginForm from './LoginForm';
import useAuth from '../../hooks/useAuth';


function Login() {
  const { user, loading, error, login, signUp, logout } = useAuth();
  const navigate = useNavigate();
  console.log("user:", user)
  useEffect(() => {
    document.title = 'Login | Rent or Sale';
    if (user) {
      
      navigate('/profile');
    }
  }, [user]);

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Welcome back</FormHeading>
        <LoginForm />
        <p className="text-center text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
      </FormCard>
    </FormContainer>
  );
}

export default Login;
