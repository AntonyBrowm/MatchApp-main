import {
  AuthRoutes,
  AuthServiceError,
  UnverifiedUserDAO,
} from '@enroute/definitions';
import { AxiosError } from 'axios';
import { saveUserId } from '../../services/localstorage';

export const createAuthError = (error: AxiosError): AuthServiceError => {
  if (!error.response)
    return {
      title: 'Ooops',
      message: 'Algo salio mal, vuelve a intentar',
      error,
    };

  const authError: AuthServiceError = {
    title: 'Ooops',
    message: 'Algo salio mal, vuelve a intentar',
    error,
  };

  switch (error.config.url) {
    case AuthRoutes.AUTH.LOGIN.getPath():
      switch (error.response.status) {
        case 401:
          authError.title = 'Usuario inexistente';
          authError.message =
            'No se encontro ningun usuario con el correo y email que proporcionaste';
          break;
        case 403:
          authError.title = 'Usuario no verificado';
          authError.message = 'Verifica tu usario para poder usar la app';
          saveUserId((error.response.data as UnverifiedUserDAO)._id);
          break;
        case 400:
          authError.title = 'Usuario incompleto';
          authError.message =
            'Verifica que tu usario contenga toda la información necesaria';
          break;
      }
      break;
    case AuthRoutes.USER.VERIFY.getPath():
      switch (error.response.status) {
        case 400:
          authError.title = 'Código erroneo';
          authError.message = 'Código erroneo, ingresa el codigo correcto';
      }
      break;
  }
  return authError;
};
