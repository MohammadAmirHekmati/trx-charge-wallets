import { Module } from '@nestjs/common';
import { TronModule } from './tron/tron.module';
import { MongoModule } from './mongo/mongo.module';
import { EmptyWalletModule } from './empty-wallet/empty-wallet.module';
import { PostgresModule } from './postgres/postgres.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from './config';
import { ScheduleModule } from '@nestjs/schedule';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [GlobalModule,TronModule, MongoModule, EmptyWalletModule, PostgresModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(Configs.mongoose.txUrl,{connectionName:Configs.mongoose.txConnectionName}),
    MongooseModule.forRoot(Configs.mongoose.fullNodeUrl,{connectionName:Configs.mongoose.fullNodeConnectionName}),
    MongooseModule.forRoot(Configs.mongoose.novintexUrl,{connectionName:Configs.mongoose.novintexConnectionName})
  ]
})
export class AppModule {}
