import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Configs } from "src/config";
import { UserWalletSchema, UserWalletDocument } from "../schema/user.wallet.schema";

@Injectable()
export class UserWalletRepository{
    constructor(@InjectModel(UserWalletSchema.name,Configs.mongoose.txConnectionName) private userWalletModel:Model<UserWalletDocument>){}

    async getAllUsers(){
        return await this.userWalletModel.find()
    }
}