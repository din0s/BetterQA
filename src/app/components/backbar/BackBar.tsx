import "./BackBar.scss";

import PropTypes, { InferProps } from "prop-types";

import BackHome from "./BackHome";
import BackPage from "./BackPage";

BackBar.propTypes = {
  home: PropTypes.bool
};

BackBar.defaultProps = {
  home: false
};

function BackBar({ home }: InferProps<typeof BackBar.propTypes>) {
  return <div className="Back-bar">{home ? <BackHome /> : <BackPage />}</div>;
}

export default BackBar;
