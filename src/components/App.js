import React, { lazy } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import lazyComponent from '../hoc/lazyComponent';
import './App.scss';

const Repositories = lazy(() => import('./repositories'));
const User = lazy(() => import('./user'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            <Link to="/">
              Github API
            </Link>
          </p>
        </header>
        <Route path="/" exact component={lazyComponent(Repositories)} />
        <Route path="/user/:name" component={lazyComponent(User)} />
      </div>
    </BrowserRouter>
  );
};

export default App;
