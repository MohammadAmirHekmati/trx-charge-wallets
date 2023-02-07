import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Configs } from "src/config";
import { ApprovalChargeDocument, ApprovalChargeSchema } from "../schema/approval.charge.schema";

@Injectable()
export class ApprovalChargeRepository{
    constructor(@InjectModel(ApprovalChargeSchema.name,Configs.mongoose.txConnectionName) private approvalChargeModel:Model<ApprovalChargeDocument>){}

    async checkDuplicate(txId:string){
        return await this.approvalChargeModel.findOne({transactionId:txId}).lean()
    }
}