import React, { Suspense } from 'react';
import Loader from '../components/loader';

export default function lazyComponent(Component) {
  const LazyComponent = (props) => {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  }
  return LazyComponent;
}
