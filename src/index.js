// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';


// Page Wrappers
import App from './App/App';
import AsyncComponent from './components/Async/AsyncComponent';


// Global CSS
import './index.css';


// Pages
const Home = AsyncComponent(() => import('./components/Home/Home'));
const Room = AsyncComponent(() => import('./components/Room/Room'));
const NoMatch = AsyncComponent(() => import('./components/Home/Home'));




// Define Routes
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/mtg/:roomNumber',
    exact: true,
    component: Room
  },

  {
    path: '',
    exact: false,
    component: NoMatch
  },
];

ReactDOM.render(
  <BrowserRouter >
    <div>
      <App>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={ index }
              path={ route.path }
              exact={ route.exact }
              component={ route.component }
            />
          ))}
        </Switch>
      </App>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
