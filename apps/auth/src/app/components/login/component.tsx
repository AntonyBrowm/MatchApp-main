import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useFormik } from 'formik';
import { FC } from 'react';
import { LoginDTO } from '@enroute/definitions';
import { loginService } from '../../../services/login';
import { saveToken } from '../../../services/localstorage';
import * as Yup from 'yup';

export const loginSchema: Yup.SchemaOf<LoginDTO> = Yup.object().shape({
  email: Yup.string()
    .email('Escribe un email valido')
    .required('El email es requerido'),
  password: Yup.string()
    .max(20, 'La clave debe contener menos de 20 caracteres.')
    .min(3, 'La clave debe contener al menos 3 caracteres.')
    .required('La clave es requerida'),
});
export const LoginPage:FC=()=>{

const fetchLogin = async (values: LoginDTO) => {
    console.log(values);
      const auth = await loginService({
        email: values.email,
        password: values.password,
      });
      if (auth) saveToken(auth);
    };

const formik = useFormik<LoginDTO>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: fetchLogin,
  });

  return(
    <><div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <FacebookIcon />
              <GoogleIcon />
            </div>
            <span>or use your account</span>
            <input
              id="email-input-field"
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email} />
            <input
              id="password-input-field"
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password} />
            <a href="#">Forgot your password?</a>
            <button
              id="login-enter-button"
              data-testid="login-enter-button"
              className="enter-button"
              type="button"
              onClick={() => formik.handleSubmit()}>Sign In</button>
          </form>
        </div></>
  )
}
