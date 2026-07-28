import { SetMetadata } from '@nestjs/common';

export const IS_OWNER_KEY = 'isOwner';
export const IsOwner = () => SetMetadata(IS_OWNER_KEY, true);
