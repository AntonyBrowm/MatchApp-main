import { CreateAboutDTO, CreateQuestionDTO, CreateUserDTO, Gender, Horoscope, Lookingfor } from "@enroute/definitions";
import { yearsToMilliseconds } from "@enroute/helpers";
import { loginService } from "apps/auth/src/services/login";
import { signinService } from "apps/auth/src/services/signin";
import { useFormik } from "formik";
import { FC, RefObject } from "react";
import * as Yup from 'yup';

export interface RegisterProps {
  registerRef: RefObject<HTMLDivElement>;
  backCard: () => void;
  nextCard: () => void;
}


export const personalQuestionSchema: Yup.SchemaOf<CreateQuestionDTO> =Yup.object() .shape({
  question: Yup.string()
    .max(50, 'La pregunta tiene que ser menor a 50 caracteres')
    .required('La pregunta es requerida'),
  answer: Yup.string()
    .max(100, 'La respuesta no puede ser mayor a 100 caracteres')
    .required('La respuesta es requerida'),
}).required();
export const aboutSchema: Yup.SchemaOf<CreateAboutDTO> = Yup.object().shape({
  description: Yup.string()
    .min(20, 'La descripcion debe tener un minimo de 20 caracteres')
    .max(
      200,
      'La descripcion no puede tener una longitud mayor a 200 caracteres'
    )
    .required('Tu descripcion es requerida'),
  horoscope: Yup.mixed<Horoscope>().oneOf(Object.values(Horoscope)),
  personal_questions: Yup.array().of(personalQuestionSchema as Yup.AnySchema),
});
export const registerSchema: Yup.SchemaOf<CreateUserDTO> = Yup.object().shape({
  email: Yup.string()
    .email('Escribe un email valido')
    .required('El email es reuqerido'),
  password: Yup.string()
    .max(20, 'La clave debe contener menos de 20 caracteres.')
    .min(3, 'La clave debe contener al menos 3 caracteres.')
    .required('La clave es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas tienen que ser iguales')
    .required('La confirmación es requerida'),
  gender: Yup.mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required('Selecciona un rol de genero'),
  city: Yup.string(),
  country: Yup.string(),
  phone: Yup.string().required('Tu telefono es requerido'),
  name: Yup.string().required('Tu nombre es requerido'),
  last_name: Yup.string(),
  birthday: Yup.date()
    .max(
      new Date(new Date().getTime() - yearsToMilliseconds(21)),
      'Tienes mayor de edad para poder registrarte'
    )
    .min(
      new Date(new Date().getTime() - yearsToMilliseconds(90)),
      'Sigues con vida?'
    )
    .required('La fecha de nacimiento es necesaria'),
  lookingfor: Yup.mixed<Lookingfor>()
    .oneOf(Object.values(Lookingfor))
    .required('Selecciona un tipo de interes'),
  about: aboutSchema,
});

export const RegisterPage:FC<RegisterProps> = ({
  registerRef,
  backCard,
  nextCard,
})=>{

  const fetchRegister = async (values: CreateUserDTO) => {
    const registerResponse = await signinService({
      ...values,
      confirmPassword:values.confirmPassword,
      password: values.password,
    });

    if (!registerResponse) {
      return;
    }

    await loginService({
      email: registerResponse.email,
      password: values.password,
    });
  };

  const formikRegister = useFormik<CreateUserDTO>({
    initialValues: {
      email: '',
      password: '',
      name: '',
      last_name: '',
      birthday: new Date(),
      confirmPassword: '',
      lookingfor: Lookingfor.CASUAL,
      phone: '',
      city: '',
      gender: Gender.MALE,
      country: '',
      about: {
        description: '',
        horoscope: Horoscope.ARIES,
        personal_questions: [
          {
            answer: '',
            question: '',
          },
          {
            answer: '',
            question: '',
          },
        ],
      },
    },
    validationSchema: registerSchema,
    onSubmit: fetchRegister,
  });
  return (<form>
    <div ref={registerRef} className="form-container-register-in-container">
        <div className="register-form-content">
          <h1>Register</h1>
          <input
            id="email-input-field"
            type="email"
            placeholder="Email"
            name="email"
            onChange={formikRegister.handleChange('email')}
            onBlur={formikRegister.handleBlur('email')}
            value={formikRegister.values.email} />
            {formikRegister.errors.email}
            {formikRegister.touched.email && formikRegister.errors.email !== undefined}
          <input
            id="password-input-field"
            type="password"
            name="password"
            placeholder="Password"
            onChange={formikRegister.handleChange('password')}
            onBlur={formikRegister.handleBlur('password')}
            value={formikRegister.values.password}
            />
            {formikRegister.errors.password}
            {formikRegister.touched.password && formikRegister.errors.password !== undefined}
                <button
                type='button'
                data-testid="register-1-next-button"
                onClick={nextCard}
                className="enter-button">
                Siguiente
              </button>
        </div>
        <div className="register-form-content">
              <input
                id="register-name-input-field"
                type="text"
                placeholder="Nombre(s)"
                name="name"
                onChange={formikRegister.handleChange('name')}
                onBlur={formikRegister.handleBlur('name')}
                value={formikRegister.values.name}
              />
              {formikRegister.errors.name}
              {formikRegister.touched.name && formikRegister.errors.name !== undefined}
              <input
                id="register-last-name-input-field"
                type="text"
                name="last_name"
                placeholder="Apellidos"
                onChange={formikRegister.handleChange('last_name')}
                onBlur={formikRegister.handleBlur('last_name')}
                value={formikRegister.values.last_name}
              />
              {formikRegister.errors.last_name}
              {formikRegister.touched.last_name && formikRegister.errors.last_name !== undefined}
              <div className="two-fields-container">
                <input
                  id="register-country-input-field"
                  type="text"
                  name="country"
                  placeholder="País"
                  onChange={formikRegister.handleChange('country')}
                  onBlur={formikRegister.handleBlur('country')}
                  value={formikRegister.values.country}
                />
                {formikRegister.errors.country}
                {formikRegister.touched.country && formikRegister.errors.country !== undefined}
                <input
                  id="register-city-input-field"
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  onChange={formikRegister.handleChange('city')}
                  onBlur={formikRegister.handleBlur('city')}
                  value={formikRegister.values.city}
                />
                {formikRegister.errors.city}
                {formikRegister.touched.city && formikRegister.errors.city !== undefined}
              </div>
              <input
                id="register-phone-input-field"
                type="text"
                placeholder="Telefono"
                name="phone"
                onChange={formikRegister.handleChange('phone')}
                onBlur={formikRegister.handleBlur('phone')}
                value={formikRegister.values.phone}
              />
              {formikRegister.errors.phone}
              {formikRegister.touched.phone && formikRegister.errors.phone !== undefined}
              <div className="two-options-container">
              <div className="two-fields-container">
                <p>Escoge tu genero</p>
                <select
                  id="register-gender-input-field"
                  name="gender"
                  placeholder="Genero"
                  onChange={formikRegister.handleChange('gender')}
                  onBlur={formikRegister.handleBlur('gender')}
                  value={formikRegister.values.gender}
                >
                  {Object.values(Gender).map((gender) => (
                    <option
                      key={'register-gender-option-' + gender}
                      value={gender}
                    >
                      {gender}
                    </option>
                  ))}
                </select>
                {formikRegister.errors.gender}
                {formikRegister.touched.gender && formikRegister.errors.gender !== undefined}
                </div>
                <div className='two-fields-container'>
                 <p>¿Que es lo que buscas?</p>
                <select
                  id="register-looking-input-field"
                  name="lookingfor"
                  placeholder="¿Que buscas?"
                  onChange={formikRegister.handleChange('lookingfor')}
                  onBlur={formikRegister.handleBlur('lookingfor')}
                  value={formikRegister.values.lookingfor}
                >
                  {Object.values(Lookingfor).map((looking) => (
                    <option
                      key={'register-lookingfor-option-' + looking}
                      value={looking}
                    >
                      {looking}
                    </option>
                  ))}
                </select>
                {formikRegister.errors.lookingfor}
                {formikRegister.touched.lookingfor && formikRegister.errors.lookingfor !== undefined}
                </div>
                </div>
              <input
                id="register-birthday-input-field"
                type="date"
                placeholder="Fecha de nacimiento"
                name="birthday"
                onChange={formikRegister.handleChange('birthday')}
                onBlur={formikRegister.handleBlur('birthday')}
              />
              {formikRegister.errors.birthday as string}
              {formikRegister.touched.birthday && formikRegister.errors.birthday !== undefined}
               <div className="two-fields-container">
               <p>Escoge tu Horoscopo</p>
              <select
                id="register-horoscope-input-field"
                name="horoscope"
                placeholder="Horoscopo"
                onChange={formikRegister.handleChange('about.horoscope')}
                onBlur={formikRegister.handleBlur('about.horoscope')}
                value={formikRegister.values.about.horoscope}
              >
                {Object.values(Horoscope).map((horoscope) => (
                  <option
                    key={'register-horoscope-option-' + horoscope}
                    value={horoscope}
                  >
                    {horoscope}
                  </option>
                ))}
              </select>
              {formikRegister.errors.about?.horoscope}
              {formikRegister.touched.about?.horoscope && formikRegister.errors.about?.horoscope !== undefined}
              </div>
              <textarea
                className='textarea-description'
                id="register-description-input-field"
                placeholder="Escribe una descripción sobre ti"
                name="description"
                onChange={formikRegister.handleChange('about.description')}
                onBlur={formikRegister.handleBlur('about.description')}
                value={formikRegister.values.about.description}
              />
              {formikRegister.errors.about?.description}
              {formikRegister.touched.about?.description && formikRegister.errors.about?.description !== undefined}
              <div className="register-buttons-container">
              <button
                        type='button'
                        data-testid="register-3-back-button"
                        onClick={backCard}
                        className="back-button"
                      >
                        Anterior
                      </button>
                      <button
                        type='button'
                        data-testid="register-3-next-button"
                        onClick={nextCard}
                        className="next-button"
                      >
                        Siguiente
                      </button>
              </div>
        </div>
        <div className="register-form-content">
        {formikRegister.values.about &&
                formikRegister.values.about.personal_questions && (
                  <>
                    <input
                      id="register-personal-question-1-input-field"
                      type="text"
                      placeholder="Pregunta 1"
                      name="question-1"
                      onChange={formikRegister.handleChange(
                        'about.personal_questions[0].question'
                      )}
                      onBlur={formikRegister.handleBlur(
                        'about.personal_questions[0].question'
                      )}
                      value={
                        formikRegister.values.about.personal_questions[0]
                          ? formikRegister.values.about.personal_questions[0]
                              .question
                          : ''
                      }
                    />
                    {(formikRegister.errors.about?.personal_questions && formikRegister.errors.about?.personal_questions[0]? (formikRegister.errors.about
                              .personal_questions[0] as unknown as {
                              question: string;
                            }): {}).question}
                    {
                        formikRegister.touched.about?.personal_questions &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            question: boolean;
                          }>
                        )[0] &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            question: boolean;
                          }>
                        )[0].question &&
                        formikRegister.errors.about?.personal_questions !==
                          undefined &&
                        formikRegister.errors.about.personal_questions[0] !==
                          undefined &&
                        (
                          formikRegister.errors.about
                            .personal_questions[0] as unknown as CreateQuestionDTO
                        ).question !== undefined
                      }
                    <textarea
                      id="register-personal-answer-1-input-field"
                      placeholder="Respuesta 1"
                      name="answer"
                      onChange={formikRegister.handleChange(
                        'about.personal_questions[0].answer'
                      )}
                      onBlur={formikRegister.handleBlur(
                        'about.personal_questions[0].answer'
                      )}
                      value={
                        formikRegister.values.about.personal_questions[0]
                          ? formikRegister.values.about.personal_questions[0]
                              .answer
                          : ''
                      }
                    />
                    {
                        (formikRegister.errors.about?.personal_questions &&
                        formikRegister.errors.about?.personal_questions[0]
                          ? (formikRegister.errors.about
                              .personal_questions[0] as unknown as {
                              answer: string;
                            })
                          : {}
                        ).answer
                      }
                      {
                        formikRegister.touched.about?.personal_questions &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            answer: boolean;
                          }>
                        )[0] &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            answer: boolean;
                          }>
                        )[0].answer &&
                        formikRegister.errors.about?.personal_questions !==
                          undefined &&
                        formikRegister.errors.about.personal_questions[0] !==
                          undefined &&
                        (
                          formikRegister.errors.about
                            .personal_questions[0] as unknown as CreateQuestionDTO
                        ).answer !== undefined
                      }
                    <div className="register-buttons-container">
                    </div>
                  </>
                )}
                {formikRegister.values.about &&
                formikRegister.values.about.personal_questions && (
                  <>
                    <input
                      id="register-personal-question-2-input-field"
                      type="text"
                      placeholder="Pregunta 2"
                      name="question-2"
                      onChange={formikRegister.handleChange(
                        'about.personal_questions[1].question'
                      )}
                      onBlur={formikRegister.handleBlur(
                        'about.personal_questions[1].question'
                      )}
                      value={
                        formikRegister.values.about.personal_questions[1]
                          ? formikRegister.values.about.personal_questions[1]
                              .question
                          : ''
                      }
                    />
                    {
                        (formikRegister.errors.about?.personal_questions &&
                        formikRegister.errors.about?.personal_questions[1]
                          ? (formikRegister.errors.about
                              .personal_questions[1] as unknown as {
                              question: string;
                            })
                          : {}
                        ).question
                      }
                      {
                        formikRegister.touched.about?.personal_questions &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            question: boolean;
                          }>
                        )[1] &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            question: boolean;
                          }>
                        )[1].question &&
                        formikRegister.errors.about?.personal_questions !==
                          undefined &&
                        formikRegister.errors.about.personal_questions[1] !==
                          undefined &&
                        (
                          formikRegister.errors.about
                            .personal_questions[1] as unknown as CreateQuestionDTO
                        ).question !== undefined
                      }
                    <textarea
                      id="register-personal-answer-2-input-field"
                      placeholder="Respuesta 2"
                      name="answer"
                      onChange={formikRegister.handleChange(
                        'about.personal_questions[1].answer'
                      )}
                      onBlur={formikRegister.handleBlur(
                        'about.personal_questions[1].answer'
                      )}
                      value={
                        formikRegister.values.about.personal_questions[1]
                          ? formikRegister.values.about.personal_questions[1]
                              .answer
                          : ''
                      }/>
                      {
                        (formikRegister.errors.about?.personal_questions &&
                        formikRegister.errors.about?.personal_questions[1]
                          ? (formikRegister.errors.about
                              .personal_questions[1] as unknown as {
                              answer: string;
                            })
                          : {}
                        ).answer
                      }
                      {
                        formikRegister.touched.about?.personal_questions &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            answer: boolean;
                          }>
                        )[1] &&
                        (
                          formikRegister.touched.about
                            .personal_questions as unknown as Array<{
                            answer: boolean;
                          }>
                        )[1].answer &&
                        formikRegister.errors.about?.personal_questions !==
                          undefined &&
                        formikRegister.errors.about.personal_questions[1] !==
                          undefined &&
                        (
                          formikRegister.errors.about
                            .personal_questions[1] as unknown as CreateQuestionDTO
                        ).answer !== undefined
                      }
                    <div className="register-buttons-container">
                      <button
                        type='button'
                        data-testid="register-3-back-button"
                        onClick={backCard}
                        className="back-button"
                      >
                        Anterior
                      </button>
                      <button
                        type="submit"
                        data-testid="register-3-next-button"
                        onClick={() => formikRegister.handleSubmit()}
                        className="next-button"
                      >
                        Registrarse
                      </button>
                    </div>
                  </>
                )}
        </div>
    </div>
    </form>);
}
