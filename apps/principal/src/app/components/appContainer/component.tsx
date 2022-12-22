import { FC } from 'react';
import './styles.scss';
import { Footer } from '../footer/component';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/component';

export const AppContainer: FC = () => {
  return (
    <>
      <Header />
      <section className="app-wrapper">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
