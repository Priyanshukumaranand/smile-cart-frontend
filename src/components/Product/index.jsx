import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Typography, Spinner } from "neetoui";
import { isNotNil, append } from "ramda";
import Carousel from "./Carousel";
import productsApi from "apis/products";
import { Header, PageNotFound, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import routes from "routes";
import withTitle from "utils/withTitle";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
// import { error } from "bfj/src/events";
// import { LeftArrow } from "neetoicons";
// import axios from "axios";
// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  // const history = useHistory();
  // const [isLoading, setIsLoading] = useState(true);
  // const [product, setProduct] = useState({});
  // const [isError, setIsError] = useState(false);

  // const fetchProduct = async () => {
  //   try {
  //     const response = await productsApi.show(slug);
  //     // console.log(response.data);
  //     setProduct(response);
  //   } catch (error) {
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  // fetchProduct();
  // }, []);
  // console.log(product);
  const { name, description, mrp, offerPrice, imageUrl, imageUrls } = product;

  // console.log(product.data);
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isError) {
    // console.log(isError);
    return <PageNotFound />;
  }
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withTitle(Product, i18n.t("product"));
