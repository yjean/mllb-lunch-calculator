import ErrorMessage from './ErrorMessage';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
  }

  render() {
    const { hasError, error, info } = this.state;

    if (hasError) {
      console.log(info.componentStack);
      // You can render any custom fallback UI
      return <ErrorMessage message={error.toString()} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
