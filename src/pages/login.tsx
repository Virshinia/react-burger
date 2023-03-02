import React, {useState, useCallback, useEffect} from 'react';
import {useAppSelector, useAppDispatch, useForm} from "../utils/hooks";
import styles from './page.module.css';
import {Link} from "react-router-dom";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginRequest} from "../services/reducers/auth";
import {TLoginForm} from "../utils/common-interfaces";

export const LoginPage = () => {

  const dispatch = useAppDispatch();
  const { requestError } = useAppSelector(store => store.user.requests.login)
  const [error, setVisibility] = useState(false);
  const {values, handleChange } = useForm<TLoginForm>({email: '', password: ''});

  useEffect(() => {
    setVisibility(requestError)
  }, [requestError, setVisibility])

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("go2")
      dispatch(loginRequest(values));
    },
    [values]
  );

  return (
     <main className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className="text text_type_main-medium text_color_primary">Вход</h1>
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
        { error && <p className="text text_type_main-default mb-4">
          Неверный email или пароль
        </p>}
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to="/registration" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </main>
  );
}
