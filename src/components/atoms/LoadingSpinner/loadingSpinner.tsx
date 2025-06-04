import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 top-1/2 z-20 flex h-20 w-full items-center justify-center">
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 rounded-full border-8 border-purple-300"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-8 border-purple-500 border-t-transparent"></div>
      </div>
    </div>
  );
};
