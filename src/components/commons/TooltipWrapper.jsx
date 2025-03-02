import { Tooltip } from "neetoui";

const TooltipWrapper = ({ showTooltip, children, ...tooltipProps }) => {
  if (!showTooltip) return children;

  return <Tooltip {...tooltipProps}>{children}</Tooltip>;
};

export default TooltipWrapper;
