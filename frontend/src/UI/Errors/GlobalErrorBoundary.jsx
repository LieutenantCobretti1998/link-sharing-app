import { Component } from 'react';
import NotFoundError from "./NotFoundError.jsx";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log the error to an error reporting service here if needed

  }

  render() {
    if (this.state.hasError) {
      // Render custom error UI (e.g., NotFoundError component)
      return <NotFoundError />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
