import * as React from 'react';
import './style.css';
import { DiagramEngine, DiagramModel } from 'storm-react-diagrams';

export interface BarProps {
  engine: DiagramEngine;
}

export interface BarState {}

export class Bar extends React.Component<BarProps, BarState> {
  public static defaultProps: BarProps = {
    engine: null
  };

  state = {
    showImportExport: false,
    text: ''
  };

  toggleImportExport = () => {
    this.setState({ showImportExport: !this.state.showImportExport });
  };

  onTextChange = event => {
    this.setState({ text: event.target.value });
  };

  export = () => {
    const model = this.props.engine.getDiagramModel();

    if (model) {
      const str = JSON.stringify(model.serializeDiagram());
      this.setState({ text: str });
    }
  };

  import = () => {
    const newModel = new DiagramModel();
    newModel.deSerializeDiagram(JSON.parse(this.state.text), this.props.engine);
    this.props.engine.setDiagramModel(newModel);
    this.props.engine.repaintCanvas();
  };

  render() {
    return (
      <div className="bar">
        <button onClick={this.toggleImportExport}>Import / Export</button>
        {this.state.showImportExport && (
          <div className="import-export">
            <textarea value={this.state.text} onChange={this.onTextChange} />
            <button onClick={this.export}>Export</button>
            <button onClick={this.import}>Import</button>
          </div>
        )}
      </div>
    );
  }
}

export default Bar;
