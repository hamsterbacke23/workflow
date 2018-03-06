import * as React from 'react';
import './style.css';
import Diagram from '../Diagram';
import Bar from '../Bar';

class App extends React.Component {
  state = {
    engine: null
  };

  setEngine = engine => {
    this.setState({ engine });
  };

  render() {
    return (
      <div className="App">
        <Bar engine={this.state.engine} />
        <Diagram setEngine={this.setEngine} />
      </div>
    );
  }
}

export default App;
