import React, {useState, useCallback} from 'react';
import { useDispatch } from "react-redux";
import styles from './page.module.css';
import {Button, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {resetPassword} from "../services/reducers/auth";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({password: '', token: ''});

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });

  };

  const handlerResetPassword = useCallback(
    e => {
      e.preventDefault();
      dispatch(resetPassword(form))
      setValue({password: '', token: ''})
    },
    [form, dispatch]
  );


  return (
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">Восстановление пароля</h1>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          placeholder={'Введите новый пароль'}
          name={'password'}
          isIcon={false}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
        />
        <Button onClick={handlerResetPassword} htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? Войти</p>
    </main>
  );
}
