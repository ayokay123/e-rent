import { useState } from 'react';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import TextInput from '../../components/TextInput';
import TextAreaInput from '../../components/TextAreaInput';
import ToggleInput from '../../components/ToggleInput';
import RadioInput from '../../components/RadioInput';
import FileInput from '../../components/FileInput';
import UploadedImageThumb from '../../components/UploadedImageThumb';

import validationSchema from './validationSchema';
import initialValues from './initalValues';
import { submitListingData, deleteSelectedImage } from './createListingFunctions';

function CreateListing() {
  const [imageThumbs, setImageThumbs] = useState([]);
  const navigate = useNavigate();

  const onDropHanlder = (acceptedFiles, setFieldValue) => {
    setImageThumbs(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    setFieldValue('images', acceptedFiles);
  };

  const onSubmit = async (values) => {
    try {
      let xmls =
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gen="http://www.baeldung.com/springsoap/gen">\
      <soapenv:Header/>\
      <soapenv:Body>\
      <gen:addPropertyRequest>\
      <gen:property>\
      <gen:location>${values.address}</gen:location>\
      <gen:price>${values.regularPrice}</gen:price>\
      <gen:title>${values.title}</gen:title>\
      <gen:description>${values.description}</gen:description>\
      <gen:user_fk>${user.id}</gen:user_fk>\
      <gen:status>${values.type}</gen:status>\
      </gen:property>\
      </gen:addPropertyRequest>\
      </soapenv:Body>\
      </soapenv:Envelope>`;

      axios
        .post('http://localhost:8082/ws/property.wsdl', xmls, {
          headers: { 'Content-Type': 'text/xml' }
        })
        .then((res) => {
          console.log("ITEM ADDED:", res);
          navigate("/my-listings")
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Create listing</h1>
        <div className="max-w-3xl mx-auto">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ isSubmitting, values, resetForm, setFieldValue }) => {
              return (
                <Form className="space-y-4">
                  <div>
                    <span id="listing-type">Listing type</span>
                    <div
                      role="group"
                      aria-labelledby="listing-type"
                      className="grid grid-cols-2 gap-9 max-w-md">
                      <RadioInput
                        id="forSale"
                        label="For sale"
                        name="type"
                        value="SALE"
                        checked={values.type === 'SALE'}
                      />
                      <RadioInput
                        id="forRent"
                        label="For rent"
                        name="type"
                        value="RENT"
                        checked={values.type === 'RENT'}
                      />
                    </div>
                  </div>
                  <div>
                    <TextInput label="Title" id="title" name="title" type="text" />
                  </div>
                  <div>
                    <TextAreaInput label="Description" id="description" name="description" />
                  </div>
                  <div>
                    <TextAreaInput label="Address" id="address" name="address" />
                  </div>
                  <div>
                    <TextInput
                      label="Price (in USD)"
                      id="regularPrice"
                      name="regularPrice"
                      type="number"
                      min="0"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="btn btn-neutral btn-block mt-3 mx-0"
                      onClick={() => resetForm()}
                      disabled={isSubmitting}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary md:mt-3 btn-block mx-0"
                      disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
}

export default CreateListing;
