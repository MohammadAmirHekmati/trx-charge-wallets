import { Module } from '@nestjs/common';
import { GlobalModule } from 'src/global/global.module';
import { MongoModule } from 'src/mongo/mongo.module';
import { TronModule } from 'src/tron/tron.module';
import { EmptyWalletService } from './empty-wallet.service';

@Module({
  imports:[GlobalModule,MongoModule,TronModule],
  providers: [EmptyWalletService]
})
export class EmptyWalletModule {}
