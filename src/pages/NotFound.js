import React from 'react';

const NotFound = ({staticContext = {}}) => {
  staticContext.notFound = true;

  return (
    <h1 className="u-text-center">Page not found</h1>
  );
};

export default NotFound;
