import { Component } from 'react';
import NotFoundError from "./NotFoundError.jsx";
import ServerError from "./ServerError.jsx";


class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorType: null };
  }

  static getDerivedStateFromError(error) {
    let errorType = null;
    if(error.name === "ServerError") {
      errorType = "ServerError";
    }
    return { hasError: true, errorType: errorType };
  }

  componentDidCatch(error, info) {
    // You can log the error to an error reporting service here if needed

  }

  render() {
    if (this.state.hasError) {
      if(this.state.errorType === "ServerError") {
        return <ServerError />;
      }
      return <NotFoundError />;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
