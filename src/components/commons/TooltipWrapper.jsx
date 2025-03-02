import { Tooltip } from "neetoui";
import PropTypes from "prop-types";

const TooltipWrapper = ({ showTooltip, children, ...tooltipProps }) => {
  if (!showTooltip) return children;

  return (
    <Tooltip {...tooltipProps}>
      <div>{children}</div>
    </Tooltip>
  );
};

TooltipWrapper.propTypes = {
  showTooltip: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default TooltipWrapper;
