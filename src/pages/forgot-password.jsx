import React, {useCallback} from 'react';
import styles from './page.module.css';
import {useSelector, useDispatch} from "react-redux";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {editInput, passwordChangeRequest} from "../services/reducers/auth";

export const ForgotPasswordPage = () => {

  const {email} = useSelector(store => store.user.userInfo);
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(editInput({name: e.target.name, value: e.target.value}))
  };

  const handleRegister = useCallback(
    e => {
      e.preventDefault();
      dispatch(passwordChangeRequest({"email": email}))
    },
    [dispatch, email]
  );

  return (
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">Восстановление пароля</h1>
        <EmailInput
          onChange={onChange}
          value={email}
          placeholder={'Укажите e-mail'}
          name={'email'}
        />
        <Button onClick={handleRegister} htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
