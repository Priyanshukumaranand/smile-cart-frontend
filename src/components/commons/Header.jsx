import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";
import { LeftArrow } from "neetoicons";
import PropTypes from "prop-types";

const Header = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const history = useHistory();
  return (
    <div className="m-2">
      <div className="mx-6 mb-2 mt-6 flex items-end justify-between">
        <div className="flex items-center">
          {shouldShowBackButton && (
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
              onClick={history.goBack}
            />
          )}
          <Typography style="h1" weight="semibold">
            {title}
          </Typography>
        </div>
        <div className="flex items-end space-x-4">{actionBlock}</div>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  shouldShowBackButton: PropTypes.bool,
  actionBlock: PropTypes.node,
};

export default Header;
