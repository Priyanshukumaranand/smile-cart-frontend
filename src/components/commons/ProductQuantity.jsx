import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { TooltipWrapper } from "components/commons";
import { useRef } from "react";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Toastr, Input, Button } from "neetoui";
import { VALID_COUNT_REGEX } from "./constants";
import PropTypes from "prop-types";
// import { product } from "ramda";
// import { paths } from "ramda";
// import useCartItemsStore from "stores/useCartItemsStore";
// import { shallow } from "zustand/shallow";

const ProductQuantity = ({ slug }) => {
  const { data: product = {} } = useShowProduct(slug);
  // console.log(product);
  const { availableQuantity } = product;
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const countInputFocus = useRef(null);

  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      Toastr.error(`Only ${availableQuantity} units are available`, {
        autoClose: 2000,
      });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };
  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring-0"
        // disabled={isNotValidQuantity}
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={preventNavigation}
      />
      {/* {selectedQuantity} */}
      <TooltipWrapper
        content="Reached maximum units"
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={e => {
            preventNavigation(e);
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

ProductQuantity.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default ProductQuantity;
