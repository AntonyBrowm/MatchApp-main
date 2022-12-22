import { RegisterDAO, CreateUserDTO, AuthRoutes } from '@enroute/definitions';
import { authInstance } from './axios';

export const signinService = async (
  createUserDTO: CreateUserDTO
): Promise<RegisterDAO | undefined> => {
  const response = await authInstance.post<RegisterDAO>(
    AuthRoutes.USER.CREATE.getPath(),
    createUserDTO
  );

  if (!response) {
    return;
  }

  return response.data;
};
