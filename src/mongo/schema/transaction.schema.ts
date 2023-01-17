import { Prop, SchemaFactory,Schema, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TimeStamp } from '../dto/tra.saction.dto';

export type TransactionDocument =TransactionSchema & Document;

@Schema({ timestamps: true ,collection:"transaction"})
export class TransactionSchema {
    @Prop(raw({
        $numberLong:{type:Number}
    }))
    timeStamp: TimeStamp;

    @Prop({type:String})
    triggerName: string;

    @Prop({type:String})
    transactionId: string;
    
    @Prop({type:String})
    blockHash: string;

    @Prop({type:Number})
    blockNumber: number;

    @Prop({type:Number})
    energyUsage: number;

    @Prop({type:Number})
    energyFee: number;

    @Prop({type:Number})
    originEnergyUsage: number;

    @Prop({type:Number})
    energyUsageTotal: number;

    @Prop({type:Number})
    netUsage: number;

    @Prop({type:Number})
    netFee: number;

    @Prop({type:String})
    result: string;

    @Prop({type:Object})
    contractAddress?: any;

    @Prop({type:String})
    contractType: string;

    @Prop({type:Number})
    feeLimit: number;

    @Prop({type:Number})
    contractCallValue: number;
    
    @Prop({type:Object})
    contractResult?: any;

    @Prop({type:String})
    fromAddress: string;
    
    @Prop({type:String})
    toAddress: string;

    @Prop({type:String})
    assetName: string;

    @Prop({type:Number})
    assetAmount: number;

    @Prop({type:Number})
    latestSolidifiedBlockNumber: number;

    @Prop()
    internalTransactionList: any[];

    @Prop({type:String})
    data: string;

    @Prop({type:Number})
    transactionIndex: number;

    @Prop({type:Number})
    cumulativeEnergyUsed: number;

    @Prop({type:Number})
    preCumulativeLogCount: number;

    @Prop({type:Object})
    logList?: any;

    @Prop({type:Number})
    energyUnitPrice: number;    
}


    export const transactionSchema = SchemaFactory.createForClass(TransactionSchema);