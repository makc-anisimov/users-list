import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.scss';
import NotFoundImage from '../../assets/images/not-found_1.png'

export const NotFoundPage: React.FC = () => {
  return (
    <section className={styles.notFound}>
      <h1 className={styles.notFound__title}>Страница не найдена</h1>
      <img className={styles.notFound__image} src={NotFoundImage} alt='404 Not Found' />
      <Link to="/" className={styles.notFound__homeLink}>Вернуться на главную</Link>
    </section>
  );
};

