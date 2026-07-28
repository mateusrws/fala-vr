import { BadRequestException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

export function getUserId(token: string) {
  const tokenLimpo = token.replace(/^Bearer\s+/i, '').trim();

  const decoded: any = jwtDecode(tokenLimpo);
  const userId = decoded.sub;

  if (!userId) {
    throw new BadRequestException(
      'Token inválido ou ID do usuário não encontrado.',
    );
  }
  return userId;
}
