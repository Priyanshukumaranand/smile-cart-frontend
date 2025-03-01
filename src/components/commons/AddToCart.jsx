import { useContext } from "react";

import CartItemsContext from "src/contexts/CartItemsContext";
import { Button } from "neetoui";
import { without } from "ramda";

const AddToCart = ({ slug }) => {
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );
  };

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
