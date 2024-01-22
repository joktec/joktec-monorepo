import { IBrowser, ICPU, IDevice, IEngine, IOS } from '@joktec/core';
import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class SessionOs implements IOS {
  @Prop({ required: true, comment: "Possible 'os.name'" })
  name: string;

  @Prop({ required: true, comment: 'Determined dynamically' })
  version: string;
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class SessionBrowser implements IBrowser {
  @Prop({ required: true, comment: "Possible 'os.name'" })
  name: string;

  @Prop({ required: true, comment: 'Determined dynamically' })
  version: string;

  @Prop({ required: true, comment: 'Determined dynamically', deprecated: true })
  major: string;
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class SessionDevice implements IDevice {
  @Prop({ required: true, comment: 'Determined dynamically' })
  model: string;

  @Prop({ required: true, comment: 'Possible type: console, mobile, tablet, smarttv, wearable, embedded' })
  type: string;

  @Prop({ required: true, comment: 'Possible vendor' })
  vendor: string;
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class SessionCPU implements ICPU {
  @Prop({ required: true, comment: 'Possible architecture: amd64, arm, arm64...' })
  architecture: string;
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class SessionEngine implements IEngine {
  @Prop({ required: true, comment: 'Possible name: Amaya, EdgeHTML, Gecko, iCab, KHTML, Links...' })
  name: string;

  @Prop({ required: true, comment: 'Determined dynamically' })
  version: string;
}
