import React, {useState, useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './page.module.css';
import {Link} from "react-router-dom";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {loginRequest} from "../services/reducers/auth";

export const LoginPage = () => {

  const dispatch = useDispatch();
  const { requestError } = useSelector(store => store.user.requests.login)
  const [form, setValue] = useState({email: '', password: ''});
  const [error, setVisibility] = useState(false);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    setVisibility(requestError)
  }, [requestError, setVisibility])

  const handleLogin = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginRequest(form));
    },
    [form]
  );


  return (
     <main className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">Вход</h1>
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
        { error && <p className="text text_type_main-default mb-4">
          Неверный email или пароль
        </p>}
        <Button onClick={handleLogin} htmlType="button" type="primary" size="medium">
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
