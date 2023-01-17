import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Configs } from "src/config";
import { CreateTrxConfirmedTx } from "../dto/create.trx.confirmed.tx.dto";
import { TrxConfirmedTransactionDocument, TrxConfirmedTransactionSchema } from "../schema/confirmed.transaction.schema";
import { TrxEmptyWalletTransactionDocument, TrxEmptyWalletTransactionSchema } from "../schema/trx.empty.wallet.schema";

@Injectable()
export class ConfirmedTransactionRepository{
    constructor(@InjectModel(TrxConfirmedTransactionSchema.name,Configs.mongoose.txConnectionName) private confirmedTransactionModel:Model<TrxConfirmedTransactionDocument>,
    @InjectModel(TrxEmptyWalletTransactionSchema.name,Configs.mongoose.txConnectionName) private trxEmptyWalletModel:Model<TrxEmptyWalletTransactionDocument>){}

    async insertTrxConfirmedTx(createConfirmedTx:CreateTrxConfirmedTx){
        return await this.confirmedTransactionModel.create(createConfirmedTx)
    }

    async insertEmptyWallet(createEmptyTx:CreateTrxConfirmedTx){
        return await this.trxEmptyWalletModel.create(createEmptyTx)
    }

    async findALlConfirmedTxs(){
        return await this.confirmedTransactionModel.find().sort({["timeStamp"]:"asc"}).limit(100).lean()
    }
}