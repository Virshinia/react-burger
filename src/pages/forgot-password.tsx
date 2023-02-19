import React, {useCallback, useState} from 'react';
import styles from './page.module.css';
import {useAppDispatch} from "../utils/hooks";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {passwordChangeRequest} from "../services/reducers/auth";

export const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(passwordChangeRequest({"email": email}));
      navigate("/reset-password");
    },
    [email]
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
