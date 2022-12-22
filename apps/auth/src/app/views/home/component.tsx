import { FC, useEffect, useRef, useState } from 'react';
import { LoginPage } from '../../components/login/component';
import { RegisterPage } from '../../components/register/component';
import './styles.scss';

export const Home: FC = () => {
  const [formView, setFormView] = useState('enter');
  const [registerCard, setRegisterCard] = useState(0);
  const registerForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRegisterToPage = () => {
      if (registerForm.current) {
        registerForm.current.scroll({
          left: registerCard * 1665,
          behavior: 'smooth',
        });
      }
    };
    scrollRegisterToPage();
  }, [registerCard]);

  const toggledRegister = () => {
    setFormView(formView === 'enter' ? 'register' : 'enter');
  };

  const nextRegisterCard = () => {
    setRegisterCard((actualView) => actualView + 1);
  };

  const backRegisterCard = () => {
    setRegisterCard((actualView) => actualView - 1);
  };

  return (
    <>
    <div className="login-container" id="login-container">
        {formView === 'enter' ? (
          <> <LoginPage/>
          <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button className="ghost" id="signUp" onClick={toggledRegister}>
                      {formView === 'enter' ? 'Sign Up' : 'Ingresar'}
                    </button>
                  </div>
                </div>
              </div></>
        ):(
          <RegisterPage
          registerRef={registerForm}
          backCard={backRegisterCard}
          nextCard={nextRegisterCard}
        />
        )}
    </div>
    </>
  );
};

export default Home;
