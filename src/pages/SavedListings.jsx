import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';
import useAuth from '../hooks/useAuth';

/*{
  "data": {
      "findAllAppointments": [
          {
              "id": "202",
              "clientId": "1",
              "agentId": "5",
              "propertyId": "1",
              "dateTime": "2024-03-28T10:15:30",
              "description": "sq",
              "status": "PENDING"
          }
      ]
  }
}*/

function SavedListings() {
  const initalRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const { user, login, signUp, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post('http://127.0.0.1:8088/apis/graphql', { 
        query : ` {
          findAllAppointments {
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
      console.log(data.data.findAllAppointments)
      setListings(data.data.findAllAppointments);
      return data;
    };
    fetchData();
  }, []);


  useEffect(() => {
    document.title = 'Appointments | Rent or Sell';
  }, []);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Appointments</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
     
  {listings.length > 0 && (
  <table>
    <tbody>
      <tr>
        <td>Date</td>
        <td>Description</td>
        <td>Status</td>
      </tr>
      {listings.map((item) => (
        <tr key={item.id}>
          <td>{item.dateTime}</td>
          <td>{item.description}</td>
          <td>{item.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

        </div>
      </section>
    </main>
  );
}

export default SavedListings;
