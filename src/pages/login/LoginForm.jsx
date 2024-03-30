import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import TextInput from '../../components/TextInput';
import useAuth from '../../hooks/useAuth';
import { useAuthentication } from '../../hooks/api/useAuthentification';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});

function LoginForm() {
  const navigate = useNavigate();
  const { user, loading, error, login, signUp, logout } = useAuth();
  const { trigger } = useAuthentication();

  const onSubmit = async ({ email, password }) => {
    try {
      await trigger({
        email,
        password
      });
      login({
        password,
        email
      });

      navigate('/profile');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => {
        return (
          <Form>
            <div className="mb-4">
              <TextInput label="Email" id="email" name="email" type="email" />
            </div>
            <div className="mb-8">
              <TextInput label="Password" id="password" name="password" type="password" />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mx-0 mb-8"
              disabled={isSubmitting}>
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
