// import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
// import { Request } from 'express';
// import { Observable } from 'rxjs';
// import { UsersService } from 'src/modules/users/users.service';

// @Injectable()
// export class AutoLogin implements CanActivate {
//     constructor(
//         private UsersService: UsersService

//     ) {

//     }
//     async canActivate(
//         context: ExecutionContext,
//     ) {
//         const request: Request = context.switchToHttp().getRequest();
//         const response = context.switchToHttp().getResponse();

//         return true
//     }
// }
