import { TransactionSchema } from "../schema/transaction.schema";
import { UserWalletSchema } from "../schema/user.wallet.schema";

export class CreateUserTransactionDto{
    wallet:UserWalletSchema
    transaction:TransactionSchema
}