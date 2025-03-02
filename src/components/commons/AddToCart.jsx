import { Button } from "neetoui";
import { isNil, paths } from "ramda";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import ProductQuantity from "./ProductQuantity";
import PropTypes from "prop-types";
// import { useContext } from "react";
// import useCartItemsStore from "stores/useCartItemsStore";
// import CartItemsContext from "src/contexts/CartItemsContext";
// import { shallow } from "zustand/shallow";

const AddToCart = ({ slug, availableQuantity }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  // const { isInCart, toggleIsInCart } = useCartItemsStore(
  //   store => ({
  //     isInCart: store.cartItems.includes(slug),
  //     toggleIsInCart: store.toggleIsInCart,
  //   }),
  //   shallow
  // );

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug, availableQuantity }} />;
};

AddToCart.propTypes = {
  slug: PropTypes.string.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};

export default AddToCart;
