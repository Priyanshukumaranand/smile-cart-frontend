import ProductQuantity from "components/commons/ProductQuantity";
import { Typography } from "neetoui";
import PropTypes from "prop-types";
import { Delete } from "neetoicons";
import { prop } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { Alert } from "neetoui";
import { useState } from "react";

const ProductCard = ({
  slug,
  image_url: imageUrl,
  offer_price: offerPrice,
  mrp,
  name,
  available_quantity: availableQuantity,
}) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  const removeCartItem = useCartItemsStore.pickFrom();

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        {/* <ProductQuantity {...{ availableQuantity, slug }} /> */}
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ availableQuantity, slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel="Yes, remove"
            title="Remove item?"
            message={
              <Typography>
                You are removing <strong>{name}</strong> from cart. Do you want
                to continue?
              </Typography>
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItem(slug);
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  slug: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  offer_price: PropTypes.number.isRequired,
  mrp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  available_quantity: PropTypes.number.isRequired,
};

export default ProductCard;
