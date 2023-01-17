import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from 'src/config';
import { MongoService } from './mongo.service';
import { ConfirmedTransactionRepository } from './repositories/confirmed.transaction.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { UserTransactionRepository } from './repositories/user.transaction.repository';
import { UserWalletRepository } from './repositories/user.wallet.repository';
import { trxConfirmedTransactionSchema, TrxConfirmedTransactionSchema } from './schema/confirmed.transaction.schema';
import { TransactionSchema, transactionSchema } from './schema/transaction.schema';
import { trxEmptyWalletTransactionSchema, TrxEmptyWalletTransactionSchema } from './schema/trx.empty.wallet.schema';
import { userTransactionSchema, UserTransactionSchema } from './schema/user.transaction.schema';
import { userWalletSchema, UserWalletSchema } from './schema/user.wallet.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:UserWalletSchema.name,schema:userWalletSchema},{name:UserTransactionSchema.name,schema:userTransactionSchema},
    {name:TrxConfirmedTransactionSchema.name,schema:trxConfirmedTransactionSchema},{name:TrxEmptyWalletTransactionSchema.name,schema:trxEmptyWalletTransactionSchema}],Configs.mongoose.txConnectionName),
    MongooseModule.forFeature([{name:TransactionSchema.name,schema:transactionSchema}],Configs.mongoose.fullNodeConnectionName)
  ],
  providers:[MongoService,TransactionRepository,UserWalletRepository,UserTransactionRepository,ConfirmedTransactionRepository],
  exports:[MongoService,TransactionRepository,UserWalletRepository,UserTransactionRepository,ConfirmedTransactionRepository]

})
export class MongoModule {}
