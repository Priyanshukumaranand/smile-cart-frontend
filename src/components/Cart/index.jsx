import Header from "components/commons/Header";
import { isEmpty, keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import PageLoader from "components/commons/PageLoader";
import ProductCard from "components/Cart/ProductCard";
import PriceCard from "./PriceCard";
import { cartTotalOf } from "components/utils";
import { MRP, OFFER_PRICE } from "../commons/constants";
import i18n from "i18next";
import withTitle from "utils/withTitle";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
// import { useState } from "react";
// import { Toastr } from "neetoui";
// import { NoData } from "neetoui";
// import { useEffect } from "react";
// import productsApi from "apis/products";

const Cart = () => {
  const slugs = useCartItemsStore(store => keys(store.cartItems));
  const { data: responses = [], isLoading } = useFetchCartProducts(slugs);
  const products = responses.map(response => response.data);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

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

export default withTitle(Cart, i18n.t("cart.title"));
