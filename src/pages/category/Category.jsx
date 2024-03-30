import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import convert from 'xml-js';

import ListingItem from '../../components/ListingItem';
import ListingItemSkeleton from '../../skeletons/ListingItemSkeleton';

import useAbortableEffect from '../../hooks/useAbortableEffect';
import useAuth from './../../hooks/useAuth';

import { getListingsByCategory, getFilteredListings } from './filterFunctions';

function Category() {
  const initalRender = useRef(true);
  const [sortBy, setSortBy] = useState('');
  const [listings, setListings] = useState([]);
  const { user, login, signUp, logout } = useAuth();

  const { categoryName } = useParams();



  useEffect(() => {
    const getAllListings = async () => {
      try {
        let xmls =
          '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gen="http://www.baeldung.com/springsoap/gen">\
          <soapenv:Header/>\
          <soapenv:Body>\
          <gen:getAllPropertiesRequest/>\
          </soapenv:Body>\
          </soapenv:Envelope>';

        await axios
          .post('http://localhost:8082/ws/property.wsdl', xmls, {
            headers: { 'Content-Type': 'text/xml' }
          })
          .then((res) => {
            const data = JSON.parse(convert.xml2json(res.data, { compact: true, spaces: 2 }));
            const propertiesArray =
              data['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getAllPropertiesResponse'][
                'ns2:property'
              ];

            const arrayOfValues = propertiesArray.map((property) => {
              const formattedObject = {};
              for (const key in property) {
                if (key.startsWith('ns2:')) {
                  const newKey = key.slice(4);
                  formattedObject[newKey] = property[key]['_text'];
                }
              }
              return formattedObject;
            });

            console.log(arrayOfValues);
            console.log(data);
            setListings(arrayOfValues.filter((item) => item.user_fk !== user?.id));
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    console.log('lelelela');
    getAllListings();
  }, [categoryName]);


  const pageTitle = categoryName === 'sale' ? 'For Sale' : 'For Rent';

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="sm:flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center sm:mb-0 mb-5">
            {pageTitle}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.length > 0 &&
            listings.map((item) => {
              return (
                <ListingItem
                  key={item.id }
                  docID={item.id}
                  item = {item}
                />
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default Category;
