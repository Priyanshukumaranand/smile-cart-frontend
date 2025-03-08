import { useState } from "react";
import { Header, PageLoader } from "components/commons";
import { Search } from "neetoicons";
import { isEmpty } from "ramda";
import ProductListItem from "./ProductListItem";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import { Pagination, Input, NoData } from "neetoui";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";
import useQueryParams from "hooks/useQueryParams";
import routes from "../../routes";
import { mergeLeft } from "ramda";
import { filterNonNull } from "neetocist";
import useFuncDebounce from "hooks/useFuncDebounce";

const ProductList = () => {
  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  // const [cartItems, setCartItems] = useState([]);
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
  const [searchKey, setSearchKey] = useState(searchTerm);
  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  // const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data, isLoading } = useFetchProducts(productsParams);
  const products = data?.data?.products || [];
  console.log(products);
  const totalProductsCount = data?.data?.total_products_count;

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <Header
        // cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={({ target: { value } }) => {
              updateQueryParams(value);
              setSearchKey(value);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          navigate={handlePageNavigation}
          count={totalProductsCount}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};
export default ProductList;

// const fetchProducts = async () => {
//   try {
//     const {
//       data: { products },
//     } = await productsApi.fetch({ search_term: debouncedSearchKey });
//     console.log(products);
//     setProducts(products);
//   } catch (error) {
//     console.log("An error occurred:", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// useEffect(() => {
//   fetchProducts();
// }, [debouncedSearchKey]);

// const toggleIsInCart = slug =>
//   setCartItems(prevCartItems =>
//     prevCartItems.includes(slug)
//       ? without([slug], cartItems)
//       : [slug, ...cartItems]
//   );
