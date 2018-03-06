import * as SRD from 'storm-react-diagrams';
import { TaskNodeWidget } from './TaskNodeWidget';
import { TaskNodeModel } from './TaskNodeModel';
import * as React from 'react';

export class TaskNodeFactory extends SRD.NodeFactory {
  constructor() {
    super('task');
  }

  generateReactWidget(
    diagramEngine: SRD.DiagramEngine,
    node: TaskNodeModel
  ): JSX.Element {
    return <TaskNodeWidget engine={diagramEngine} node={node} />;
  }

  getNewInstance() {
    return new TaskNodeModel();
  }
}
