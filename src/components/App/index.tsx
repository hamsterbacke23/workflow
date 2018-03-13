import * as React from 'react';
import './style.css';
import Diagram from '../Diagram';
import Bar from '../Bar';

class App extends React.Component {
  state = {
    engine: null
  };

  /**
   * Pass along the diagram engine to other components
   * by calling this function in child components
   */
  setEngine = engine => {
    this.setState({ engine });
  };

  render() {
    return (
      <div className="app" role="main">
        <Bar engine={this.state.engine} />
        <Diagram setEngine={this.setEngine} />
        <div className="instructions">
          <h2>Usage</h2>
          <ul>
            <li>
              <strong>Zoom in and out</strong>: Use mousewheel
            </li>
            <li>
              <strong>Select</strong>: Click single nodes or links
            </li>
            <li>
              <strong>Select multiple</strong>: Hold shift and use mouse
            </li>
            <li>
              <strong>Delete</strong>: Select nodes and hit 'delete' on your
              keyboard
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
