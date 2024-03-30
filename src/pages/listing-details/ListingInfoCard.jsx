import ListingPrice from './ListingPrice';

import { ReactComponent as BedroomIcon } from '../../assets/svg/bed.svg';
import { ReactComponent as BathroomIcon } from '../../assets/svg/bathtub.svg';
import { ReactComponent as CarIcon } from '../../assets/svg/car.svg';
import { ReactComponent as RulerIcon } from '../../assets/svg/ruler.svg';

function ListingInfoCard({ id, location, price, title, description, status }) {
  return (
    <>
      <ListingPrice type={status} regularPrice={price} />
    </>
  );
}

export default ListingInfoCard;
