import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoadProgress from "react-topbar-progress-indicator";
LoadProgress.config({
  barColors: {
    "0": "#ffffff",
    "0.5": "#ffffff",
    "1.0": "#ffffff",
  },
  shadowBlur: 0,
  barThickness: 1,
});
class RouteChange extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount() {
    this.setState({ loading: false });
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ loading: false });
      this.setState({ loading: true });
      setTimeout(() => this.setState({ loading: false }), 1000);
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <React.Fragment>{this.state.loading && <LoadProgress />}</React.Fragment>
    );
  }
}
export default withRouter(RouteChange);
