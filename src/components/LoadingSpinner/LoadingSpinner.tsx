import React from "react";
import "./loadingSpinner.css";

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  return isLoading ? (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  ) : null;
};

export default LoadingSpinner;
