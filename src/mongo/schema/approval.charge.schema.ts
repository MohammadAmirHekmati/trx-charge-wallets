import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApprovalChargeDocument = HydratedDocument<ApprovalChargeSchema>;

@Schema()
export class ApprovalChargeSchema {
  @Prop({type:String,required:true})
  transactionId:string

  @Prop({type:String})
  contract:string

  @Prop({type:String})
  address:string

  @Prop({type:String})
  amount:string
}

export const approvalChargeSchema = SchemaFactory.createForClass(ApprovalChargeSchema);