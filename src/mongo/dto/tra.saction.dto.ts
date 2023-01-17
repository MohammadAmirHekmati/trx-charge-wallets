export interface Id {
    $oid: string;
}

export interface TimeStamp {
    $numberLong: string;
}

export interface RootObject {
    _id: Id;
    timeStamp: TimeStamp;
    triggerName: string;
    transactionId: string;
    blockHash: string;
    blockNumber: number;
    energyUsage: number;
    energyFee: number;
    originEnergyUsage: number;
    energyUsageTotal: number;
    netUsage: number;
    netFee: number;
    result: string;
    contractAddress?: any;
    contractType: string;
    feeLimit: number;
    contractCallValue: number;
    contractResult?: any;
    fromAddress: string;
    toAddress: string;
    assetName: string;
    assetAmount: number;
    latestSolidifiedBlockNumber: number;
    internalTransactionList: any[];
    data: string;
    transactionIndex: number;
    cumulativeEnergyUsed: number;
    preCumulativeLogCount: number;
    logList?: any;
    energyUnitPrice: number;
}