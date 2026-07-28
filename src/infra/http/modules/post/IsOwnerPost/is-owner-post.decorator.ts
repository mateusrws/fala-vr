import { SetMetadata } from '@nestjs/common';

export const IS_OWNER_KEY = 'isOwnerPost';
export const IsOwnerPost = () => SetMetadata(IS_OWNER_KEY, true);
