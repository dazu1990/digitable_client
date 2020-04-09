import React, { Component } from 'react';
import './App.css';

// Common Components
// import MainMenu from '../components/Navs/MainMenu/MainMenu';


/**
 * Main App Wrapper - This class wraps the entire application. It handles the proper assignment of the localized subdir on mount. It is also home to any common components.
 * @constructor
 */
class App extends Component {

  render() {
    return (
      <div>
        <div className="content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;
