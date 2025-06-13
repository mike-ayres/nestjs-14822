import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getHello(): string {
        return 'Hello World!';
    }

    public getHelloName(name: string | undefined): string {
        if (!name) {
            return this.getHello();
        }

        return `Hello, ${name}!`;
    }
}
