import { useContext } from "react";
import useCartItemsStore from "stores/useCartItemsStore";
// import CartItemsContext from "src/contexts/CartItemsContext";
import { Button } from "neetoui";
import { shallow } from "zustand/shallow";
import { isNil, paths } from "ramda";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { isInCart, toggleIsInCart } = useCartItemsStore(
    store => ({
      isInCart: store.cartItems.includes(slug),
      toggleIsInCart: store.toggleIsInCart,
    }),
    shallow
  );

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

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

export default AddToCart;
