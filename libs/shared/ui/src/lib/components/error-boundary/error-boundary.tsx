import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    console.log('XXX error b....');
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    /// logErrorToMyService(error, info.componentStack);
    console.log('ErrorBoundary error', error, errorInfo)
    console.error('ErrorBoundary error', error, errorInfo);
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    console.log('XXX getDerivedStateFromError(', )
    return { hasError: true };
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    // const { children, fallbackComponent: FallbackComponent } = this.props;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
      // return this.props.fallback;
    }

    return this.props.children;
  }
}