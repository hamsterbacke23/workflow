import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget
} from 'storm-react-diagrams';
import * as React from 'react';
import { DefaultLinkModel } from 'storm-react-diagrams';

import { TaskNodeModel } from '../../nodes/Task/TaskNodeModel';
import { TaskNodeFactory } from '../../nodes/Task/TaskNodeFactory';
import { TaskPortModel } from '../../nodes/Task/TaskPortModel';
import { SimplePortFactory } from 'storm-react-diagrams';

export interface DiagramProps {
  setEngine: (engine: any) => void;
}

export interface DiagramState {
  engine: DiagramEngine;
}

export default class Diagram extends React.Component<
  DiagramProps,
  DiagramState
> {
  public static defaultProps: DiagramProps = {
    setEngine: null
  };

  state = {
    engine: null
  };

  componentDidMount() {
    const engine = new DiagramEngine();
    engine.installDefaultFactories();

    engine.registerPortFactory(
      new SimplePortFactory('task', config => new TaskPortModel())
    );

    engine.registerNodeFactory(new TaskNodeFactory());

    const model = new DiagramModel();
    const firstNode = new TaskNodeModel();
    firstNode.setPosition(250, 100);

    model.addAll(firstNode);
    engine.setDiagramModel(model);

    this.setState({ engine });

    if (this.props.setEngine) {
      this.props.setEngine(engine);
    }
  }

  render() {
    return (
      this.state.engine && (
        <DiagramWidget
          className="srd-demo-canvas"
          diagramEngine={this.state.engine}
        />
      )
    );
  }
}
