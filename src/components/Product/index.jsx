import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Typography, Spinner } from "neetoui";
import { isNotNil, append } from "ramda";
import Carousel from "./Carousel";
import productsApi from "apis/products";
import { Header, PageNotFound, PageLoader } from "components/commons";
// import { LeftArrow } from "neetoicons";
// import axios from "axios";
// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [isError, setIsError] = useState(false);

  const fetchProduct = async () => {
    try {
      const data = await productsApi.fetch({ searchTerm: searchKey });
      // console.log(response.data);
      setProduct(data.products);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const { name, description, mrp, offer_price, image_urls, image_url } =
    product.data || {};
  // console.log(product.data);
  const totalDiscounts = mrp - offer_price;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isError) return <PageNotFound />;
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(image_urls) ? (
              <Carousel
                imageUrls={append(image_url, image_urls)}
                title={name}
              />
            ) : (
              <img alt={name} className="w-48" src={image_url} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offer_price}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Product;
