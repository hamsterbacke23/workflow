import * as React from 'react';
import { TaskNodeModel } from './TaskNodeModel';
import {
  PortWidget,
  DefaultLinkModel,
  DiagramEngine as engine
} from 'storm-react-diagrams';
import forEach from 'lodash/forEach';
import * as SRD from 'storm-react-diagrams';
import './task.css';

export interface TaskNodeWidgetProps {
  node: TaskNodeModel;
  engine: engine;
}

export interface TaskNodeWidgetState {}

export class TaskNodeWidget extends React.Component<
  TaskNodeWidgetProps,
  TaskNodeWidgetState
> {
  public static defaultProps: TaskNodeWidgetProps = {
    engine: null,
    node: null
  };

  constructor(props: TaskNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  cloneSelected = () => {
    const offset = { x: 200, y: 0 };
    const model = this.props.engine.getDiagramModel();
    const newItem = this.props.node.clone();
    newItem.index = this.props.node.index + 1;

    if (newItem instanceof SRD.NodeModel) {
      newItem.setPosition(newItem.x + offset.x, newItem.y + offset.y);
      newItem.selected = false;
      model.addNode(newItem);

      //Create new link
      const newLink = new DefaultLinkModel();
      newLink.setSourcePort(this.props.node.getPort('right'));
      const port = newItem.getPort('left');
      newLink.setTargetPort(port);

      // we need to wait until the element has been added
      window.setTimeout(() => {
        model.addLink(newLink);
        this.props.engine.repaintCanvas();
      }, 1);
    }
    this.forceUpdate();
    this.props.engine.repaintCanvas();
  };

  render() {
    return (
      <div className={'task-node'}>
        <PortWidget name="left" node={this.props.node} />
        <PortWidget name="top" node={this.props.node} />
        <PortWidget name="right" node={this.props.node} />
        <PortWidget name="bottom" node={this.props.node} />
        <div className="name">Kuckuck {this.props.node.index}</div>
        <div
          className="addButton"
          onClick={this.cloneSelected}
          aria-label="Hinzufügen"
        >
          <span role="presentation">+</span>
        </div>
      </div>
    );
  }
}
