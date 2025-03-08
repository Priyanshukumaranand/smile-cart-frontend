import { existsBy } from "neetocist";
import { Toastr } from "neetoui";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { useQuery, useQueries } from "react-query";
import useCartItemsStore from "stores/useCartItemsStore";
import { QUERY_KEYS } from "constants/query";
import productsApi from "apis/products";

export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
    keepPreviousData: true,
  });

export const useFetchCartProducts = slugs => {
  const { t } = useTranslation();
  const { cartItems, setSelectedQuantity } = useCartItemsStore();

  const responses = useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      queryFn: () => productsApi.show(slug),

      onSuccess: ({ available_quantity, name }) => {
        if (availableQuantity >= cartItems[slug]) return;
        setSelectedQuantity(slug, available_quantity);
        if (availableQuantity === 0) {
          Toastr.error(t("error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      },
    }))
  );

  const isLoading = existsBy({ isLoading: true }, responses);
  const data = responses.map(prop("data")).filter(Boolean);

  return { isLoading, data };
};
