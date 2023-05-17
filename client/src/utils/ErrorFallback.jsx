import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
      <botton onClick={resetErrorBoundary}>Try again</botton>
    </div>
  );
};

export default ErrorFallback;
