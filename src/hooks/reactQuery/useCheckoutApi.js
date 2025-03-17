import { QUERY_KEYS } from "constants/query";
import ordersApi from "apis/orders";
import countriesApi from "apis/countries";
import statesApi from "apis/states";
import { prop } from "ramda";
import { useQuery, useMutation } from "react-query";

export const useFetchCountries = () =>
  useQuery({
    queryKey: QUERY_KEYS.COUNTRIES,
    queryFn: () => countriesApi.fetch().then(res => res.data),
    select: prop("countries"),
    staleTime: Infinity,
  });

export const useFetchStates = stateParams =>
  useQuery({
    queryKey: [QUERY_KEYS.STATES, stateParams],
    queryFn: () => statesApi.fetch(stateParams).then(res => res.data),
    select: prop("states"),
    staleTime: Infinity,
  });

export const useCreateOrder = () => useMutation(ordersApi.create);
