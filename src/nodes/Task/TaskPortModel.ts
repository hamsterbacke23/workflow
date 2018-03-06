import * as _ from 'lodash';
import { LinkModel } from 'storm-react-diagrams';
import { DiagramEngine } from 'storm-react-diagrams';
import { PortModel } from 'storm-react-diagrams';
import { DefaultLinkModel } from 'storm-react-diagrams';

export class TaskPortModel extends PortModel {
  position: string | 'top' | 'bottom' | 'left' | 'right';

  constructor(pos: string = 'top') {
    super(pos, 'task');
    this.position = pos;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position
    });
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
