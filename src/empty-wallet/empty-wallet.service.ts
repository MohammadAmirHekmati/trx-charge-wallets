import { Injectable, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { GlobalService } from 'src/global/global.service';
import { CreateUserTransactionDto } from 'src/mongo/dto/create.user.transaction.dto';
import { TransactionRepository } from 'src/mongo/repositories/transaction.repository';
import { UserTransactionRepository } from 'src/mongo/repositories/user.transaction.repository';
import { UserWalletRepository } from 'src/mongo/repositories/user.wallet.repository';
import { TransactionSchema } from 'src/mongo/schema/transaction.schema';
import { UserWalletSchema } from 'src/mongo/schema/user.wallet.schema';
import { ConfirmedTransactionRepository } from './../mongo/repositories/confirmed.transaction.repository';
import { CreateTrxConfirmedTx } from './../mongo/dto/create.trx.confirmed.tx.dto';

@Injectable()
export class EmptyWalletService implements OnModuleInit {
    constructor(
        private userWalletRepository:UserWalletRepository,
        private transactionRepository:TransactionRepository,
        private userTransactionRepository:UserTransactionRepository,
        private confirmedTransactionRepository:ConfirmedTransactionRepository,
        private globalService:GlobalService
        ){}
    wallets:UserWalletSchema[]=[]
    async onModuleInit() {
        const userWallets=await this.userWalletRepository.getAllUsers()
        this.wallets=this.wallets.concat(userWallets)
    }

    @Interval(1000)
    async checkTransactions(){
        console.log("------- im checking -------")
        let unUsedTransaction:TransactionSchema[]=[]
        const result=await this.transactionRepository.findAllTransactions()
        for (const tx of result) {
            if(tx.assetName=='trx')
            {
                const findUser=this.wallets.find(item=>item.address==tx.toAddress)
                if(findUser)
                {
                    const checkDuplicate=await this.userTransactionRepository.checkDuplicate(tx.transactionId)
                    if(!checkDuplicate){
                        const createUserTx:CreateUserTransactionDto={
                            transaction:tx,
                            wallet:findUser
                        }
                        await this.userTransactionRepository.createUserTransaction(createUserTx)
                    }
                }else{
                    unUsedTransaction.push(tx)
                }
            }
            else{
                unUsedTransaction.push(tx)
            }
        }
        await this.transactionRepository.deletePunchOfTransaction(unUsedTransaction)
    }


    @Interval(5000)
    async checkConfirmedTransactions(){
        const txs=await this.confirmedTransactionRepository.findALlConfirmedTxs()

        for (const tx of txs) {
            const res=await this.globalService.updateUserAmount(tx.amount,tx.toAddress)
            if(res.status==200)
            {
                await this.userTransactionRepository.deleteOneUserTx(tx.transactionId)
                await this.transactionRepository.deleteUnusedTx(tx.transactionId)
                const createTrxConfirmedTx:CreateTrxConfirmedTx={
                    amount:tx.amount,
                    fromAddress:tx.fromAddress,
                    toAddress:tx.toAddress,
                    transactionId:tx.transactionId,
                    userId:tx.userId
                }
                await this.confirmedTransactionRepository.insertTrxConfirmedTx(createTrxConfirmedTx)
                await this.confirmedTransactionRepository.insertEmptyWallet(createTrxConfirmedTx)
            }
        }
    }
}
