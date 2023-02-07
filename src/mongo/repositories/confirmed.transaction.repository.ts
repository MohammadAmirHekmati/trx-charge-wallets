import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Configs } from "src/config";
import { CreateTrxConfirmedTx } from "../dto/create.trx.confirmed.tx.dto";
import { TrxConfirmedTransactionDocument, TrxConfirmedTransactionSchema } from "../schema/confirmed.transaction.schema";
import { TempTrxDocument, TempTrxSchema } from "../schema/temp.trx.schema";
import { TrxEmptyWalletTransactionDocument, TrxEmptyWalletTransactionSchema } from "../schema/trx.empty.wallet.schema";

@Injectable()
export class ConfirmedTransactionRepository{
    constructor(@InjectModel(TrxConfirmedTransactionSchema.name,Configs.mongoose.txConnectionName) private confirmedTransactionModel:Model<TrxConfirmedTransactionDocument>,
    @InjectModel(TrxEmptyWalletTransactionSchema.name,Configs.mongoose.txConnectionName) private trxEmptyWalletModel:Model<TrxEmptyWalletTransactionDocument>,
    @InjectModel(TempTrxSchema.name,Configs.mongoose.txConnectionName) private tempTrxModel:Model<TempTrxDocument>){}

    async insertTrxConfirmedTx(createConfirmedTx:CreateTrxConfirmedTx){
        return await this.confirmedTransactionModel.create(createConfirmedTx)
    }

    async insertEmptyWallet(createEmptyTx:CreateTrxConfirmedTx){
        return await this.trxEmptyWalletModel.create(createEmptyTx)
    }

    async findALlConfirmedTxs(){
        return await this.confirmedTransactionModel.find().limit(100).lean()
    }

    async allEmptyWallets(){
        return await this.trxEmptyWalletModel.find().limit(100).lean()
    }

    async createTempTrx(tempTrx:TempTrxSchema){
        return await this.tempTrxModel.create(tempTrx)
    }

    async getAllTempTrx(){
        return await this.tempTrxModel.find().limit(100).lean()
    }

    async deleteOneEmptyTx(txId:string){
        await this.trxEmptyWalletModel.findOneAndDelete({transactionId:txId})
    }

    async deleteOneTempTrx(txId:string){
        await this.tempTrxModel.findOneAndDelete({transactionId:txId})
    }
}