import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import styles from './profile.module.css';
import {Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {editInput} from "../services/reducers/auth";

export const ProfilePage = () => {

  const {name, email, password} = useSelector(store => store.user.userInfo);
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(editInput({name: e.target.name, value: e.target.value}))
  };

  const profileLinkActive = `${styles.link} text text_type_main-medium`
  const profileLinkInactive = `${styles.link} text text_type_main-medium text_color_inactive`

  return (
    <main className={styles.wrapper}>
      <aside className={styles.aside}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? profileLinkActive : profileLinkInactive}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? profileLinkActive : profileLinkInactive}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? profileLinkActive : profileLinkInactive}
        >
          Выход
        </NavLink>
        <p className="text text_type_main-small text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </aside>
      <form className={styles.form}>
        <Input
          placeholder={'Имя'}
          onChange={onChange}
          value={name}
          name={'name'}
          icon='EditIcon'
        />
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          icon='EditIcon'
        />
        <PasswordInput
          onChange={onChange}
          value={password}
          name={'password'}
          icon='EditIcon'
        />
      </form>
    </main>
  );
}
