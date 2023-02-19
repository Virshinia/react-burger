import React from 'react';
import styles from './page.module.css';
import {useNavigate} from "react-router-dom"
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const handlerOnClick = () => {
    navigate('/')
  }

  return (
    <main className={styles.wrapper}>
      <h1 className="text text_type_main-medium text_color_primary">Никого нет дома</h1>
      <p className="text text_type_main-default text_color_inactive mt-8 mb-8">
        Возможно страница улетела в космос... или просто устарела.
      </p>
      <Button onClick={handlerOnClick} htmlType="button">Перейти на главную</Button>
    </main>
  );
}
