import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import ListingItem from '../components/ListingItem';
import ListingItemSkeleton from '../skeletons/ListingItemSkeleton';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

function MyListings() {
  const initalRender = useRef(true);

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [listingTypeOption, setListingTypeOption] = useState('all');
  const [listingDocId, setListingDocId] = useState('');

  useEffect(() => {
    document.title = 'My Listings | Rent or Sell';
  }, []);

  // useEffect(() => {
  //   if (snapshot) {
  //     const listingsData = [];
  //     snapshot.forEach((doc) => {
  //       return listingsData.push({
  //         docID: doc.id,
  //         data: doc.data()
  //       });
  //     });
  //     setListings(listingsData);
  //     setFilteredListings(listingsData);
  //   }
  // }, [snapshot]);

  useEffect(() => {
    const getAllListings  =async() => {
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
            console.log("ITEMS:", res);
            setListings(res)
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {}
    }

    getAllListings();
  })



  useEffect(() => {
    if (!initalRender.current) {
      if (listingTypeOption === 'all') {
        setFilteredListings(listings);
      } else {
        const filterResults = listings.filter((listing) => listing.data.type === listingTypeOption);
        setFilteredListings(filterResults);
      }
    } else {
      initalRender.current = false;
    }
  }, [listingTypeOption]);

  const deleteListing = async (docID) => {
    try {
      // await deleteDoc(doc(db, 'listings', docID));
      // const newFilteredListings = filteredListings.filter((listing) => listing.docID !== docID);
      // setFilteredListings(newFilteredListings);
      // const newListings = listings.filter((listing) => listing.docID !== docID);
      // setListings(newListings);
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showConfirmationModal = (docID) => {
    setListingDocId(docID);
    setisConfirmationModalOpen(true);
  };

  const hideConfirmationModal = () => {
    setisConfirmationModalOpen(false);
  };

  const onConfirm = () => {
    deleteListing(listingDocId);
    hideConfirmationModal();
  };

  return (
    <>
      <main className="min-h-screen max-w-7xl px-3 mx-auto">
        <section className="lg:py-24 md:py-20 py-14">
          <div className="md:flex md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">My Listings</h1>
            <select
              className="select select-bordered w-full max-w-xs mb-8 mx-auto md:mx-0 block"
              value={listingTypeOption}
              onChange={(e) => setListingTypeOption(e.target.value)}>
              <option value="all">All</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.length === 0 ? (
              <p className="xl:col-span-3 md:col-span-2">No listings to show.</p>
            ) : null}
            {filteredListings.length > 0 &&
              filteredListings.map(({ docID, data }) => (
                <ListingItem
                  key={docID}
                  docID={docID}
                  deleteListing={() => showConfirmationModal(docID)}
                  // editListing={auth.currentUser.uid === data.userRef}
                  {...data}
                />
              ))}
          </div>
        </section>
      </main>
      <DeleteConfirmationModal
        message="Are you sure you want to delete this listing?"
        showModal={isConfirmationModalOpen}
        hideModal={hideConfirmationModal}
        onConfirm={onConfirm}
      />
    </>
  );
}

export default MyListings;
