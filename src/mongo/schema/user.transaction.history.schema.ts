import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ArchTxLinkEnum } from '../enums/arch.tx.link.enum';

export type UserTransactionHistoryDocument = HydratedDocument<UserTransactionHistory>;

@Schema({ timestamps: true })
export class UserTransactionHistory {
  @Prop({ type: String })
  uid: string;

  @Prop({ type: String,})
  arch_symbol: string;

  @Prop({ type: String })
  crypto_symbol: string;

  @Prop({type:String})
  tx_id:string

  @Prop({ type: String, enum:ArchTxLinkEnum })
  tx_check_link: string;

  @Prop({ type: String })
  amount: string;

  @Prop({ type: String })
  memo: string;

  @Prop({ type: String })
  from: string;

  @Prop({ type: String })
  to: string;
}

export const userTransactionHistory = SchemaFactory.createForClass(UserTransactionHistory);