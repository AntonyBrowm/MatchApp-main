import { AuthDAO, AuthRoutes, LoginDTO } from '@enroute/definitions';
import { authInstance } from './axios';

export const loginService = async (
  loginDTO: LoginDTO
): Promise<AuthDAO | undefined> => {
  const response = await authInstance.post<AuthDAO>(
    AuthRoutes.AUTH.LOGIN.getPath(),
    loginDTO
  );

  if (!response) {
    return;
  }

  return response.data;
};
