import { AuthDAO, AuthRoutes, VerifyDTO } from '@enroute/definitions';
import { authInstance } from './axios';

export const verifyService = async (
  verifyDTO: VerifyDTO
): Promise<number | undefined> => {

  const response = await authInstance.patch<AuthDAO>(
    AuthRoutes.USER.VERIFY.getPath(),
    verifyDTO
  );

  if (!response) {
    return;
  }

  return response.status;
};
