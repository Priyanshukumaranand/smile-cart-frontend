import { Typography, Tag } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";
import PropTypes from "prop-types";

const Product = ({ name, image_url, offer_price, slug }) => {
  const { [slug]: selectedQuantity } = useCartItemsStore.pick("cartItems");

  return (
    <div className="mt-3 flex">
      <div className="neeto-ui-rounded neeto-ui-border-gray-500 relative border">
        <img
          alt={name}
          className="neeto-ui-rounded"
          height={60}
          src={image_url}
          width={60}
        />
        <div className="absolute right-0 top-0 -mr-2 -mt-2">
          <Tag className="w-2" label={selectedQuantity} type="solid" />
        </div>
      </div>
      <div className="m-5 flex w-1/2 justify-between">
        <Typography style="h5" weight="semibold">
          {name}
        </Typography>
        <Typography style="h5">${offer_price}</Typography>
      </div>
    </div>
  );
};
Product.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  offer_price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Product;
