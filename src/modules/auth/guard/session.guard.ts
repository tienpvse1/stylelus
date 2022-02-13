import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/constance';
import { SessionRepository } from 'src/modules/session/session.repository';
import { getIp } from 'src/util/ip';
import { getCustomRepository } from 'typeorm';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest();
    if (isPublic) {
      return true;
    }
    const sessionId = request.cookies['sessionId'];
    const repository = getCustomRepository(SessionRepository);
    const session = await repository.findOne({
      where: {
        id: sessionId,
        ip: getIp(request.ip),
      },
      relations: ['account'],
    });
    if (!session) return false;
    if (new Date(session.expiredAt) < new Date()) {
      repository.delete(sessionId);
      return false;
    }

    request.user = {
      id: session.account.id,
    };

    // save action to history

    return true;
  }
}
