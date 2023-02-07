import { Injectable } from '@nestjs/common';
import { CheckTransactionDto } from './dto/check.transaction';
import { TransferCoinDto } from './dto/transfer.coin.dto';
const axios=require("axios")
const TronWeb =require("tronweb")
const bigDecimal=require("js-big-decimal")

@Injectable()
export class TronService {
  private tronWeb
  constructor(){
    this.tronWeb = new TronWeb({
      fullNode: "http://192.168.35.240:8090",
      solidityNode:"http://192.168.35.240:8091",
      // privateKey:"4CF08D609A23C08DDE714D44A191B85DD3A76F77A6A60B3732450BB82540F333"
    })
}

async transferCoin( transferCoinDto : TransferCoinDto) :Promise<string>{
    try {

      let  tradeObj = await this.tronWeb.transactionBuilder.sendTrx(
        transferCoinDto.to_address, bigDecimal.multiply(transferCoinDto.amount , Math.pow(10 , 6)) ,
        transferCoinDto.from_address );
      const signedTransaction = await this.tronWeb.trx.sign(
        tradeObj,   transferCoinDto.private_key );
      const receipt = await this.tronWeb.trx.sendRawTransaction( signedTransaction  );
      if (receipt.code) {
        throw new Error(`${receipt.code}`)
      }
      return receipt.txid
    } catch (e) {
      console.log("-------- transfer coin --------")
      console.log(e)
    }
  }

  async checkTransaction(hash:string):Promise<CheckTransactionDto>{
    const res=await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${hash}`)
    const data:CheckTransactionDto=res.data
    
    return data
  }
}
