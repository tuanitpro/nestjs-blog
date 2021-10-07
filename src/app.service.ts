import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  
  getHello(): string {
    return 'Hello! Today: ' + new Date().toJSON();
  }
}
