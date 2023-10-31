import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World estoy haciendo esto desde  nest js entonces en pocas palabras necesito contactos!';
  }
}
