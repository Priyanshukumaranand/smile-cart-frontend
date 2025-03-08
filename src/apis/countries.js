import axios from "axios";

const fetch = () =>
  axios.get("https://smile-cart-backend-staging.neetodeployapp.com/countries");

const countriesApi = { fetch };

export default countriesApi;
