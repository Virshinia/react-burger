import React, {useState, useCallback} from 'react';
import {useAppDispatch} from "../utils/hooks";
import styles from './page.module.css';
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {registerRequest} from "../services/reducers/auth";

export const RegistrationPage = () => {

  const [form, setValue] = useState({ name: '', email: '', password: ''});
  const dispatch = useAppDispatch();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };


  const handleRegister = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(registerRequest(form))
    },
    [dispatch, form]
  );

  return (
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}

        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
        />
        <Button htmlType="button" type="primary" size="medium" onClick={handleRegister}>
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
