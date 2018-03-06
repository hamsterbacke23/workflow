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
import { hubot, tools, server, mirror, tasklist, dashboard } from 'octicons';

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

  randomIconPath: string;

  constructor(props: TaskNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.randomIconPath = this.setRandomIconPath();
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

  setRandomIconPath() {
    const rand = Math.floor(Math.random() * Math.floor(5));
    switch (true) {
      case rand === 0:
        return server.path;
      case rand === 1:
        return mirror.path;
      case rand === 2:
        return hubot.path;
      case rand === 3:
        return tools.path;
      case rand === 4:
        return tasklist.path;
      case rand === 5:
        return tasklist.path;
    }
  }

  render() {
    return (
      <div className={'task-node'}>
        <PortWidget name="left" node={this.props.node} />
        <PortWidget name="top" node={this.props.node} />
        <PortWidget name="right" node={this.props.node} />
        <PortWidget name="bottom" node={this.props.node} />
        <div className="title">
          Task <span className="level">(Level {this.props.node.index})</span>
        </div>
        <svg
          viewBox="0 0 16 16"
          dangerouslySetInnerHTML={{
            __html: this.randomIconPath
          }}
        />
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
