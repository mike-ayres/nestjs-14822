import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor (private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    // this works with or without trailing slash
    @Get('sample/:exampleParam?')
    public getWithOptionalRoute(@Param('exampleParam') exampleParam?: string): string {
        return this.appService.getHelloName(exampleParam);
    }

    // this works the same as sample 1 in fastify
    @Get('sample2/:exampleParam?')
    public getWithSlashBeforeOptionalRoute(@Param('exampleParam') exampleParam?: string): string {
        return this.appService.getHelloName(exampleParam);
    }

    // You need a trailing slash for this route to work (e.g., `sample3/`) because
    //  fastify only supports one optional segment (the last one)
    @Get('sample3/:exampleParam1/:exampleParam2?')
    public getMultipleOptionalRouteSegments(
        @Param('exampleParam1') exampleParam1: string,
        @Param('exampleParam2') exampleParam2?: string
    ): string {
        const fullName: string = (exampleParam1 ?? '') + ' ' + (exampleParam2 ?? '');
        return this.appService.getHelloName(fullName.trim());
    }

    // same as sample3, removed the second optional route that the express version has.
    @Get('sample4/:exampleParam1/:exampleParam2?')
    public getMultipleOptionalRouteSegments2(
        @Param('exampleParam1') exampleParam1?: string,
        @Param('exampleParam2') exampleParam2?: string
    ): string {
        const fullName: string = (exampleParam1 ?? '') + ' ' + (exampleParam2 ?? '');
        return this.appService.getHelloName(fullName.trim());
    }
}
