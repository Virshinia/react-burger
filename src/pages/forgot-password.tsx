import React, {useCallback} from 'react';
import styles from './page.module.css';
import {useAppDispatch, useForm} from "../utils/hooks";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {passwordChangeRequest} from "../services/reducers/auth";

export const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {values, handleChange} = useForm({email: ''})

  const handleRegister = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(passwordChangeRequest(values));
      navigate("/reset-password");
    },
    [values]
  );

  return (
    <main className={styles.wrapper} onSubmit={handleRegister}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">Восстановление пароля</h1>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          placeholder={'Укажите e-mail'}
          name={'email'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </main>
  );
}
