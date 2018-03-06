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

export default () => {
  var engine = new DiagramEngine();
  engine.installDefaultFactories();
  engine.registerPortFactory(
    new SimplePortFactory('task', config => new TaskPortModel())
  );

  engine.registerNodeFactory(new TaskNodeFactory());

  var model = new DiagramModel();
  var node3 = new TaskNodeModel();
  node3.setPosition(250, 108);

  model.addAll(node3);
  // var str = JSON.stringify(model.serializeDiagram());
  // window.console.log(str);
  window.setTimeout(() => {
    engine.repaintCanvas();
    window.console.log('repaint');
  }, 4000);
  engine.setDiagramModel(model);

  return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};
