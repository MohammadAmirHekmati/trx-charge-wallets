import { Injectable, OnModuleInit } from '@nestjs/common';
import { Configs } from 'src/config';
const axios=require("axios")

@Injectable()
export class GlobalService implements OnModuleInit {
    async onModuleInit() {
        // await this.updateUserAmount("10","TMiod16TmwazmncCXr8vrom3zcytkcfMED","TYnBXH9TsuzY8rviUN5EKytKf7D99z3gci")
    }

    async updateUserAmount(amount:string,address:string){
        try {
            console.log("---------- im here for updating ----------")
            const params={
                address:address,
                amount:amount
            }
            console.log(params)
            const res=await axios.get(Configs.updateWalletUrlMain, { params: {  amount:amount,address: address } })
            return res
        } catch (e) {
            console.log("---------- update user amount Global Service ----------")
            console.log(e)
        }
    }

    async test(){
        const res=await axios.get("https://tronscan.org/#/transaction/934d3231b14fbfa22741f01b9c9641c1fcb081dc84a8b5c43f87f2981d3cff5b")
        console.log("---------- res -----------")
        console.log(res.status)
    }
}
