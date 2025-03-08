import React, { useState } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Product from "components/Product";
import ProductList from "./components/ProductList";
import PageNotFound from "components/commons/PageNotFound";
import { Redirect } from "react-router";
import CartItemsContext from "./contexts/CartItemsContext";
import Cart from "components/Cart";
import routes from "routes";
import Checkout from "components/Checkout";
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  // console.log(routes.products.cart );
  return (
    <>
      <CartItemsContext.Provider value={[cartItems, setCartItems]}>
        <Switch>
          <Route exact component={ProductList} path={routes.products.index} />
          <Route exact component={Product} path={routes.products.show} />
          <Route exact component={Cart} path={routes.products.cart} />
          <Route exact component={Checkout} path={routes.products.checkout} />
          <Redirect exact from={routes.root} to={routes.products.index} />
          <Route component={PageNotFound} path="*" />
        </Switch>
      </CartItemsContext.Provider>
    </>
  );
};

export default App;

{
  /* <div className="flex space-x-2">
<NavLink exact activeClassName="underline font-bold" to="/">
  Home
</NavLink>
<NavLink exact activeClassName="underline font-bold" to="/product">
  Product
</NavLink>
</div> */
}
