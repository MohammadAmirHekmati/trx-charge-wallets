import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionSchema } from './transaction.schema';
import { UserWalletSchema } from './user.wallet.schema';


export type UserTransactionDocument = HydratedDocument<UserTransactionSchema>;

@Schema({collection:"userTrxTransaction",timestamps:true})
export class UserTransactionSchema {
  @Prop({required:true,type:UserWalletSchema})
  wallet_schema: UserWalletSchema;

  @Prop({required:true,type:TransactionSchema})
  transaction: TransactionSchema;
}

export const userTransactionSchema = SchemaFactory.createForClass(UserTransactionSchema);