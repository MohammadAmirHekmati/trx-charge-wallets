import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrxConfirmedTransactionDocument = HydratedDocument<TrxConfirmedTransactionSchema>;

@Schema()
export class TrxConfirmedTransactionSchema {
  @Prop({required:true})
  fromAddress: string;

  @Prop({type:String,required:true})
  toAddress:string

  @Prop({type:String,required:true})
  transactionId:string

  @Prop({type:String,required:true})
  amount:string

  @Prop({required:true})
  userId: string;
}

export const trxConfirmedTransactionSchema = SchemaFactory.createForClass(TrxConfirmedTransactionSchema);