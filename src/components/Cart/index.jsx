import { useEffect } from "react";
import productsApi from "apis/products";
import Header from "components/commons/Header";
import { isEmpty, keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { useState } from "react";
import PageLoader from "components/commons/PageLoader";
import ProductCard from "components/Cart/ProductCard";
import { Toastr } from "neetoui";
import PriceCard from "./PriceCard";
import { cartTotalOf } from "components/utils";
import { MRP, OFFER_PRICE } from "../commons/constants";
// import { shallow } from "zustand/shallow";
// import NoData from "neetoui";
// import { use } from "react";

const Cart = () => {
  // const slugs = useCartItemsStore(store => keys(store.cartItems), shallow);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);
  console.log(OFFER_PRICE);
  const slugs = keys(cartItems);

  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );
      const fetchedProducts = responses.map(response => response.data);
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
      fetchedProducts.forEach(
        ({ available_quantity: availableQuantity, name, slug }) => {
          if (availableQuantity >= cartItems[slug]) return;
          setSelectedQuantity(slug, availableQuantity);
          if (availableQuantity === 0) {
            Toastr.error(
              `${name} is no longer available and has been removed from cart`,
              { autoClose: 2000 }
            );
          }
        }
      );
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);

  if (isLoading) return <PageLoader />;
  if (isEmpty(products)) {
    return (
      <>
        <Header title="My Cart" />
        <div className="flex h-screen items-center justify-center">
          {/* <NoData title="Your cart is empty!" /> */}
          <div>Your cart is empty!</div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
