import { useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../components/TextInput';

function EditProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  const saveDetails = async ({ fullname }) => {
    try {
        toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullname: "ISMAIL HAMDI"
      }}
      validationSchema={Yup.object({
        fullname: Yup.string().required('Required')
      })}
      onSubmit={saveDetails}>
      {({ isSubmitting, values }) => {
        return (
          <Form>
            <div className="mb-4">
              {isEditing && <TextInput label="Name" name="fullname" id="fullname" type="text" />}
              {!isEditing && (
                <>
                  <span className="form-label">Name</span>
                  <p className="text-lg font-medium">{values.fullname}</p>
                </>
              )}
            </div>
            <div className="mb-4">
              <span className="form-label">Email</span>
              <p className="text-lg font-medium">ismailayokay@gmail.com</p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EditProfileForm;
