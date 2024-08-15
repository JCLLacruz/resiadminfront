import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SaveLastLocation: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastVisitedUrl', location.pathname + location.search);
  }, [location]);

  return null;
};

export default SaveLastLocation;
