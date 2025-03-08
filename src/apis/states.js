import axios from "axios";

const fetch = params =>
  axios.get("https://smile-cart-backend-staging.neetodeployapp.com/states", {
    params,
  });

const statesApi = { fetch };

export default statesApi;
