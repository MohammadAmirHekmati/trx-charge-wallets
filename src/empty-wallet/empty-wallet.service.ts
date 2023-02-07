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
import { ApprovalChargeRepository } from 'src/mongo/repositories/aproval.charge.repository';
import { TransferCoinDto } from 'src/tron/dto/transfer.coin.dto';
import { Configs } from 'src/config';
import { TronService } from 'src/tron/tron.service';
import { TempTrxSchema } from 'src/mongo/schema/temp.trx.schema';
import { UserTransactionHistory } from 'src/mongo/schema/user.transaction.history.schema';
import { ArchTxLinkEnum } from 'src/mongo/enums/arch.tx.link.enum';
const bigDecimal=require("js-big-decimal");

@Injectable()
export class EmptyWalletService implements OnModuleInit {
    constructor(
        private userWalletRepository:UserWalletRepository,
        private transactionRepository:TransactionRepository,
        private userTransactionRepository:UserTransactionRepository,
        private confirmedTransactionRepository:ConfirmedTransactionRepository,
        private approvalChargeRepository:ApprovalChargeRepository,
        private tronService:TronService,
        private globalService:GlobalService
        ){}
    wallets:UserWalletSchema[]=[]
    async onModuleInit() {
        const userWallets=await this.userWalletRepository.getAllUsers()
        this.wallets=this.wallets.concat(userWallets)
    }

    @Interval(1000)
    async checkTransactions(){
        try {
        console.log("------- checking transaction schema-------")
        let unUsedTransaction:TransactionSchema[]=[]
        const result=await this.transactionRepository.findAllTransactions()
        console.log(result.length)
        if(!result.length)
        process.exit()
        
        for (const tx of result) {
            if(tx.assetName=='trx')
            {
                const findUser=this.wallets.find(item=>item.address==tx.toAddress)
                if(findUser)
                {
                    const checkForApprovalCharge=await this.approvalChargeRepository.checkDuplicate(tx.transactionId)
                    if(!checkForApprovalCharge)
                    {
                        const checkDuplicate=await this.userTransactionRepository.checkDuplicate(tx.transactionId)
                    if(!checkDuplicate){
                        const createUserTx:CreateUserTransactionDto={
                            transaction:tx,
                            wallet:findUser
                        }
                        console.log(createUserTx)
                        await this.userTransactionRepository.createUserTransaction(createUserTx)
                    }
                    }
                    if(checkForApprovalCharge)
                    {
                        unUsedTransaction.push(tx)
                    }
                }
                else{
                    unUsedTransaction.push(tx)
                }
            }
            else{
                unUsedTransaction.push(tx)
            }
        }
        await this.transactionRepository.deletePunchOfTransaction(unUsedTransaction)
    } catch (error) {
        
    }
    }


    @Interval(5000)
    async checkConfirmedTransactions(){
        try {
        console.log("---- check user transactions schema  ----------")
        const txs=await this.userTransactionRepository.findAllUserTransaction()
        console.log(txs.length)
        for (const tx of txs) {
            const amountFinal=bigDecimal.divide(tx.transaction.assetAmount,"1000000",6)
            const res=await this.globalService.updateUserAmount(amountFinal,tx.transaction.toAddress)
            console.log(res.status)
            if(res.status==200)
            {
                await this.userTransactionRepository.deleteOneUserTx(tx.transaction.transactionId)
                await this.transactionRepository.deleteUnusedTx(tx.transaction.transactionId)
                const createTrxConfirmedTx:CreateTrxConfirmedTx={
                    amount:amountFinal,
                    fromAddress:tx.transaction.fromAddress,
                    toAddress:tx.transaction.toAddress,
                    transactionId:tx.transaction.transactionId,
                    userId:tx.wallet_schema.user_id
                }
                await this.confirmedTransactionRepository.insertTrxConfirmedTx(createTrxConfirmedTx)
                await this.confirmedTransactionRepository.insertEmptyWallet(createTrxConfirmedTx)
                const createUserTxLog:UserTransactionHistory={
                    amount:createTrxConfirmedTx.amount,
                    arch_symbol:"TRX",
                    crypto_symbol:"TRX",
                    from:createTrxConfirmedTx.fromAddress,
                    to:createTrxConfirmedTx.toAddress,
                    memo:"",
                    tx_check_link:ArchTxLinkEnum.TRON,
                    tx_id:createTrxConfirmedTx.transactionId,
                    uid:createTrxConfirmedTx.userId
                }

                await this.transactionRepository.createUserTransactionHistoryLog(createUserTxLog)
            }
        }
    } catch (e) {
        
    }
    }

    // @Interval(20000)
    async checkEmptyWallet(){
        console.log("------- check empty wallet -----------")
        const transaction=await this.confirmedTransactionRepository.allEmptyWallets()
        console.log(transaction.length)
        for (const tx of transaction) {
            const userPrivateKey=this.wallets.find(item=>item.address==tx.toAddress)
            const transferCoin:TransferCoinDto={
                amount:tx.amount,
                from_address:tx.toAddress,
                to_address:Configs.masterWallets[0].address,
                private_key:userPrivateKey.private_key
            }
            const result=await this.tronService.transferCoin(transferCoin)
            if(!result)
            continue

            if(result){
            const createTempTransaction:TempTrxSchema={
                amount:tx.amount,
                fromAddress:tx.toAddress,
                toAddress:Configs.masterWallets[0].address,
                userId:userPrivateKey.user_id,
                transactionId:result
            }
            await this.confirmedTransactionRepository.createTempTrx(createTempTransaction)
        }
        }
    }

    // @Interval(60000)
    async checkTempTrx(){
        const tempTrx=await this.confirmedTransactionRepository.getAllTempTrx()
        for (const tx of tempTrx) {
            const checkTransaction=await this.tronService.checkTransaction(tx.transactionId)
            if(checkTransaction.contractRet=='SUCCESS' && checkTransaction.confirmed){
                await this.confirmedTransactionRepository.deleteOneEmptyTx(tx.transactionId)
                await this.confirmedTransactionRepository.deleteOneTempTrx(tx.transactionId)
            }
        }
    }
}
