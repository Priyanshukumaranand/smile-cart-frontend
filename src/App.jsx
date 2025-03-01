import React, { useState } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Product from "components/Product";
import ProductList from "./components/ProductList";
import PageNotFound from "components/commons/PageNotFound";
import { Redirect } from "react-router";
import CartItemsContext from "./contexts/CartItemsContext";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <CartItemsContext.Provider value={[cartItems, setCartItems]}>
        <Switch>
          <Route exact component={ProductList} path="/products" />
          <Route exact component={Product} path="/products/:slug" />
          <Redirect exact from="/" to="/products" />
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
