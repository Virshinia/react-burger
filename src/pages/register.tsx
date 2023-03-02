import React, { useCallback } from 'react';
import {useAppDispatch, useForm} from "../utils/hooks";
import styles from './page.module.css';
import {Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {registerRequest} from "../services/reducers/auth";
import {IPersonalInformationForm} from "../utils/common-interfaces";

export const RegistrationPage = () => {

  const {values, handleChange } = useForm<IPersonalInformationForm>({name: ``, email: ``, password: ``});
  const dispatch = useAppDispatch();

  const handleRegister = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(registerRequest(values))
    },
    [dispatch, values]
  );

  return (
    <main className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1 className="text text_type_main-medium text_color_primary">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={false}

        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
        />
        <Button htmlType="submit" type="primary" size="medium" >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
