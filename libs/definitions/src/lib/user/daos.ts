import { User } from './types';

export type RegisterDAO = Omit<User, 'password'>;
