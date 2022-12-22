import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import * as Yup from 'yup';
import { verifyService } from '../../../services/verify';
import './styles.scss';
import { getUserId, removeUserId } from '../../../services/localstorage';

export interface CodeForm {
  code: string;
}
export interface VerifyProps {
  redirectURL: string;
}

export const verificationSchema: Yup.SchemaOf<CodeForm> = Yup.object().shape({
  code: Yup.string()
    .length(6, 'Escribe un código valido')
    .required('El código es requerido'),
});

export const Verify: FC<VerifyProps> = ({ redirectURL }) => {
  const user_id = getUserId();

  useEffect(() => {
    if (!user_id) {
      window.location.replace(redirectURL);
    }
  }, [user_id, redirectURL]);

  const verifyCode = async (values: CodeForm) => {
    if (!user_id) {
      return;
    }

    const verified_status = await verifyService({ code: values.code, user_id });

    if (verified_status && verified_status === 200) {
      removeUserId();
    }
  };

  const formik = useFormik<CodeForm>({
    initialValues: {
      code: '',
    },
    validationSchema: verificationSchema,
    onSubmit: verifyCode,
  });

  return (
    <div className="verify-container">
      <div className="verify-info-container">
        <div className="verify-card">
          <p className="verify-title">Código de verificación</p>
          <p>inserta el codigo que recibiste a tu email</p>
          <input
            className='input-codigo'
            id="verifyCode-input-field"
            type="text"
            placeholder="Código"
            name="code"
            onChange={formik.handleChange('code')}
            onBlur={formik.handleBlur('code')}
            value={formik.values.code}
          />

          <button
            className="verify-button"
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
