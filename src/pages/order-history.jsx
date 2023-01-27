import React from 'react';
import styles from './profile.module.css';
import AsideMenu from "../components/aside-menu/aside-menu";

export const OrderHistoryPage = () => {

  return (
    <main className={styles.wrapper}>
      <AsideMenu/>
      <h1 className="text text_type_main-medium text_color_primary">История заказов</h1>
      <p className="text text_type_main-default text_color_inactive mt-8 mb-8">
        Страница в разработке
      </p>
    </main>
  );
}
