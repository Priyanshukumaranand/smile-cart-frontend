import { useState, useEffect } from "react";
import { Header, PageLoader } from "components/commons";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import ProductListItem from "./ProductListItem";
import useDebounce from "hooks/useDebounce";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { data } from "browserslist";
// import productsApi from "apis/products";
// import { without } from "ramda";

const ProductList = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const debouncedSearchKey = useDebounce(searchKey);

  const { isLoading, data } = useFetchProducts({
    search_term: debouncedSearchKey,
  });
  const products = data?.data?.products ?? [];
  // console.log(useFetchProducts({
  //   search_term: debouncedSearchKey,
  // }))
  // const toggleIsInCart = slug =>
  //   setCartItems(prevCartItems =>
  //     prevCartItems.includes(slug)
  //       ? without([slug], cartItems)
  //       : [slug, ...cartItems]
  //   );

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

  if (isLoading) {
    return <PageLoader />;
  }
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
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
