import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from 'src/config';
import { MongoService } from './mongo.service';
import { ApprovalChargeRepository } from './repositories/aproval.charge.repository';
import { ConfirmedTransactionRepository } from './repositories/confirmed.transaction.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { UserTransactionRepository } from './repositories/user.transaction.repository';
import { UserWalletRepository } from './repositories/user.wallet.repository';
import { approvalChargeSchema, ApprovalChargeSchema } from './schema/approval.charge.schema';
import { trxConfirmedTransactionSchema, TrxConfirmedTransactionSchema } from './schema/confirmed.transaction.schema';
import { tempTrxSchema, TempTrxSchema } from './schema/temp.trx.schema';
import { TransactionSchema, transactionSchema } from './schema/transaction.schema';
import { trxEmptyWalletTransactionSchema, TrxEmptyWalletTransactionSchema } from './schema/trx.empty.wallet.schema';
import { UserTransactionHistory, userTransactionHistory } from './schema/user.transaction.history.schema';
import { userTransactionSchema, UserTransactionSchema } from './schema/user.transaction.schema';
import { userWalletSchema, UserWalletSchema } from './schema/user.wallet.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:UserWalletSchema.name,schema:userWalletSchema},{name:UserTransactionSchema.name,schema:userTransactionSchema},
    {name:TrxConfirmedTransactionSchema.name,schema:trxConfirmedTransactionSchema},{name:TrxEmptyWalletTransactionSchema.name,schema:trxEmptyWalletTransactionSchema},
  {name:ApprovalChargeSchema.name,schema:approvalChargeSchema},{name:TempTrxSchema.name,schema:tempTrxSchema}],Configs.mongoose.txConnectionName),
    MongooseModule.forFeature([{name:TransactionSchema.name,schema:transactionSchema}],Configs.mongoose.fullNodeConnectionName),
    MongooseModule.forFeature([{name:UserTransactionHistory.name,schema:userTransactionHistory}],Configs.mongoose.novintexConnectionName)
  ],
  providers:[MongoService,TransactionRepository,UserWalletRepository,UserTransactionRepository,ConfirmedTransactionRepository,ApprovalChargeRepository],
  exports:[MongoService,TransactionRepository,UserWalletRepository,UserTransactionRepository,ConfirmedTransactionRepository,ApprovalChargeRepository]

})
export class MongoModule {}
