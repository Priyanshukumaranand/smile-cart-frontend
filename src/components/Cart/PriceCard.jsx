import classNames from "classnames";
import { Typography, Button } from "neetoui";
import { gt, keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import PropTypes from "prop-types";
import routes from "../../routes";
import { useTranslation } from "react-i18next";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
  const { t } = useTranslation();
  const totalDiscounts = totalMrp - totalOfferPrice;
  const isDiscountPresent = gt(totalDiscounts, 0);
  const discountPercentage = ((totalDiscounts / totalMrp) * 100).toFixed(1);
  // console.log(totalOfferPrice);
  const itemsCount = useCartItemsStore(store => keys(store.cartItems).length);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black space-y-2 border p-3">
      <Typography
        className={classNames("flex justify-between", {
          "line-through": isDiscountPresent,
        })}
      >
        Total MRP: <span>${totalMrp}</span>
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className="flex justify-between text-green-700">
            Total discounts:{" "}
            <span>
              ${totalDiscounts} ({discountPercentage}%)
            </span>
          </Typography>
          <Typography className="flex justify-between">
            Total offer price: <span>${totalOfferPrice}</span>
          </Typography>
          <span className="neeto-ui-text-gray-500 text-sm">
            {itemsCount} item(s)
          </span>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800"
          label={t("buyNow")}
          to={routes.checkout}
        />
      </div>
    </div>
  );
};

PriceCard.propTypes = {
  totalMrp: PropTypes.number,
  totalOfferPrice: PropTypes.number,
};

export default PriceCard;
