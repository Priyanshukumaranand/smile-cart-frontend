import axios from "axios";

const show = slug =>
  axios
    .get(
      `https://smile-cart-backend-staging.neetodeployapp.com/products/${slug}`
    )
    .then(res => console.log(res));
const fetch = params =>
  axios.get("https://smile-cart-backend-staging.neetodeployapp.com/products/", {
    params,
  });
const productsApi = { show, fetch };

export default productsApi;
