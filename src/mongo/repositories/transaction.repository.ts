import { Injectable, OnModuleInit } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Configs } from "src/config"
import { TransactionSchema, TransactionDocument } from "../schema/transaction.schema"


@Injectable()
export class TransactionRepository implements OnModuleInit{
    constructor(
      @InjectModel(TransactionSchema.name,Configs.mongoose.fullNodeConnectionName) private transactionModel:Model<TransactionDocument>
    ){}
 async onModuleInit() {
    // await this.findAllTransactions()
  }
    
    async findAllTransactions(): Promise<TransactionSchema[]> {
         const result  =await this.transactionModel.find().sort({["timeStamp"]:"asc"}).limit(400).lean()
        // const result=await this.transactionModel.findOne({transactionId:"defcba29ca13908895b3aa4ebf5e311c5eaa6efad9e8d6a745b0d97aad846355"}).lean()
          return result
      }

      async deletePunchOfTransaction(transactions:TransactionSchema[]){
        const txIds=transactions.map(item=>item.transactionId)
       const res=await this.transactionModel.deleteMany({transactionId:{$in:txIds}})
      }

      async deleteUnusedTx(txId:string){
        await this.transactionModel.findOneAndDelete({transactionId:txId})
      }
}