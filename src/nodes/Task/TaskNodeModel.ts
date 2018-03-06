import { NodeModel, DiagramEngine } from 'storm-react-diagrams';
import { TaskPortModel } from './TaskPortModel';
import * as _ from 'lodash';

export class TaskNodeModel extends NodeModel {
  level: number;
  icon: string;

  constructor(level: number = 1) {
    super('task');
    this.addPort(new TaskPortModel('top'));
    this.addPort(new TaskPortModel('left'));
    this.addPort(new TaskPortModel('bottom'));
    this.addPort(new TaskPortModel('right'));
    this.level = level;
    this.setIcon();
  }

  deSerialize(object, engine: DiagramEngine) {
    super.deSerialize(object, engine);
    this.icon = object.icon;
    this.level = object.level;
  }

  serialize() {
    return _.merge(super.serialize(), {
      icon: this.icon,
      level: this.level
    });
  }

  setIcon() {
    const rand = Math.floor(Math.random() * Math.floor(5));
    switch (true) {
      case rand === 0:
        this.icon = 'server';
        break;
      case rand === 1:
        this.icon = 'mirror';
        break;
      case rand === 2:
        this.icon = 'hubot';
        break;
      case rand === 3:
        this.icon = 'tools';
        break;
      case rand === 4:
        this.icon = 'tasklist';
        break;
      case rand === 5:
        this.icon = 'telescope';
        break;
    }
  }
}
