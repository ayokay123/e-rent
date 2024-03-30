import { Link } from 'react-router-dom';

import SaveButton from './SaveButton';

import { ReactComponent as BedroomIcon } from '../assets/svg/bed.svg';
import { ReactComponent as BathroomIcon } from '../assets/svg/bathtub.svg';
import { ReactComponent as CarIcon } from '../assets/svg/car.svg';
import { ReactComponent as RulerIcon } from '../assets/svg/ruler.svg';
import { ReactComponent as TrashIcon } from '../assets/svg/trash.svg';
import { ReactComponent as EditIcon } from '../assets/svg/pen.svg';
import IMG from "./../assets/images/for-rent-category-bg.jpg"
import { formatPrice } from '../utils/utils';

function ListingItem({ docID, item }) {
  const listingType = item.status === 'SALE' ? 'For Sale' : 'For Rent';
  const listingPrice = `${formatPrice(item.price)} ${item.status === 'RENT' ? ' / month' : ''}`;
  return (
    <article className="card shadow-md card-bordered border-gray-200 relative">
      <div className="absolute flex items-center top-0 left-0 w-full p-4 gap-2">
        <span className={`listing-type ${item.status.toLowerCase()}`}>{listingType}</span>
        <span className="listing-type bg-primary ml-auto">{listingPrice}</span>
      </div>
      <figure className="h-72 w-full">
        <img src={IMG} alt={item.title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body text-center p-4 md:p-8">
        <p className="text-sm mb-3">{item.location}</p>
        <h2 className="card-title text-gray-900">{item.title}</h2>
        <div className="card-actions">
          <div className="flex gap-2 w-full">
            <Link className="btn btn-primary btn-block mx-0 flex-1" to={`/listing/${docID}`}>
              More info
            </Link>
            {/* {isFavorite !== undefined && <SaveButton docID={docID} isFavorite={isFavorite} />} */}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ListingItem;
