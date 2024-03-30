import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useAuth from './../hooks/useAuth';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from 'axios';
import TextAreaInput from './TextAreaInput';
import { useState, useEffect } from 'react';

function ContactOwnerModal({ showModal, hideModal, docID, userRef, listingTitle }) {
  const [value, onChange] = useState(new Date());
  const { user, loading, error, login, signUp, logout } = useAuth();

 
  const onSubmit = async ({ description }) => {
    try {
      console.log(user)
     
      const { data } = await axios.post('http://127.0.0.1:8088/apis/graphql', {
        query: `
          mutation {
            createAppointment(
              clientId: ${user.id},
              agentId: 5,
              propertyId: ${docID},
              dateTime: "${value.toISOString().slice(0, 19).replace('T', ' ')}",
              description: "${description}"
            ) {
              id
              clientId
              agentId
              propertyId
              dateTime
              description
              status
            }
          }
        `
      });

      console.log('NEW APPOINTENTMENT:', data);

      toast.success('Message sent successfully');
      // hideModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!showModal) {
    return null;
  }

  return createPortal(
    <>
      <div className="fixed inset-0 z-[999] bg-black opacity-30"></div>
      <div className="card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md z-[9999] bg-white w-full max-w-2xl">
        <div className="card-body">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4 text-center">Contact owner</h2>
          <Formik
            initialValues={{
              description: ''
            }}
            onSubmit={onSubmit}>
            {({ isSubmitting }) => {
              return (
                <Form>
                  <TextAreaInput label="Your description" id="description" name="description" />
                  <DateTimePicker onChange={onChange} value={value} disableCalendar disableClock />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <button type="button" className="btn btn-ghost" onClick={hideModal}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isSubmitting}>
                      Send message
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default ContactOwnerModal;

