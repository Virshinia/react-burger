import React, { useCallback } from 'react';
import {useAppSelector, useAppDispatch, useForm} from "../utils/hooks";
import styles from './page.module.css';
import {Link, Navigate} from "react-router-dom";
import {Button, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {resetPassword} from "../services/reducers/auth";

export const ResetPasswordPage = () => {
  const passwordChangeRequested = useAppSelector(store => store.user.requests.passwordChangeRequest.isRequested)
  const {requestSucceed, requestError} = useAppSelector(store => store.user.requests.passwordReset)

  const dispatch = useAppDispatch();
  const {values, handleChange, setValues} = useForm({password: '', token: ''})

  const handlerResetPassword = useCallback(
      (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(resetPassword(values))
      setValues({password: '', token: ''})
    },
    [values, dispatch]
  );


  return (
    (!passwordChangeRequested || requestSucceed) ? <Navigate to="/login" /> :
    <main className={styles.wrapper}>
      <form className={styles.form} onSubmit={handlerResetPassword}>
        <h1 className="text text_type_main-medium text_color_primary">Восстановление пароля</h1>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          placeholder={'Введите новый пароль'}
          name={'password'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
        />
        {requestError &&
          <p className="text text_type_main-default mt-4 mb-4">
            Не удалось восстановить пароль, проверьте код из письма
          </p>
        }
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link></p>
    </main>
  );
}
