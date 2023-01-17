export const Configs={
    mongoose:{fullNodeUrl:'mongodb://fullnode:AAAbbb000@192.168.35.169:27017/tron',
                fullNodeConnectionName:"fullnode",
              txUrl:"mongodb://localhost:27017/tron",
                txConnectionName:"transaction"},
    postgres:{user: 'postgres',host: '192.168.10.200',database: 'exchange_main',password: 'HmpCo_2022_',port: 5432,},
    redis:{host:"192.168.10.200",port:6379},
    tron:{approveMaxUnit:"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",amountChargeForApprove:"7"},
    masterWallets:[
        {address:"TLKuqH4xZVo3KUwEcADNwhEyTWk3kYyg4C",privateKey:"3F20BAB57C3D2895AC169E5A2EC5A7B166C6CD5271536029B85D723A85941A83"},
        {address:"TSfakAGDS5yHbHxELeh1GksXJiHqR3jhKp",privateKey:"458e1d226d081634c9a17831f3ce3dded2b30965cb3176bfb94969a5297aa5a1"}
    ],
    updateWalletUrlMain:"https://apiplus.novintex.com/api/v1/wallet-crypto/update/tron",
    updateWalletUrlTest:"http://localhost:42621/api/v1/wallet-crypto/update/tron",
}