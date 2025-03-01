import { Typography } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({
  image_url: imageUrl,
  name,
  offer_price: offerPrice,
  slug,
}) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40 w-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
  </Link>
);

//for fixing the prop types (not-required)
ProductListItem.propTypes = {
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  offer_price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductListItem;
