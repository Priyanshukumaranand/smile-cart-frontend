import { Typography } from "neetoui";
import { Trans } from "react-i18next";

const PriceEntry = ({ totalPrice, i18nKey, className = "" }) => (
  <Typography className="flex justify-between" style="h5">
    <Trans
      {...{ i18nKey }}
      components={{ span: <span {...{ className }} /> }}
      values={{ totalPrice }}
    />
  </Typography>
);

import PropTypes from "prop-types";

PriceEntry.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  i18nKey: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default PriceEntry;
