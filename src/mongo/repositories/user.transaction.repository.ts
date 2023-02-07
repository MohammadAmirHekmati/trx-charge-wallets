import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Configs } from "src/config";
import { CreateUserTransactionDto } from "../dto/create.user.transaction.dto";
import { UserTransactionSchema, UserTransactionDocument } from "../schema/user.transaction.schema";

@Injectable()
export class UserTransactionRepository{
    constructor(@InjectModel(UserTransactionSchema.name,Configs.mongoose.txConnectionName) private userTransactionModel: Model<UserTransactionDocument>){}

    async checkDuplicate(tx:string){
        return await this.userTransactionModel.findOne({"transaction.transactionId":tx}).lean()
    }

    async createUserTransaction(createUserTransaction:CreateUserTransactionDto){
        return await this.userTransactionModel.create({wallet_schema:createUserTransaction.wallet,transaction:createUserTransaction.transaction})
    }

    async deleteOneUserTx(txId:string){
        await this.userTransactionModel.findOneAndDelete({"transaction.transactionId":txId})
    }

    async findAllUserTransaction(){
    return await this.userTransactionModel.find().limit(100).lean()
    }
}