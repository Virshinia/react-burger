import React from 'react';
import {useDispatch} from "react-redux";
import styles from './aside-menu.module.css';
import {NavLink} from "react-router-dom";
import {logout} from "../../services/reducers/auth";
import {deleteCookie} from "../../utils/cookies";

const AsideMenu = () => {
  const dispatch = useDispatch();
  const profileLinkActive = `${styles.link} ${styles.active} text text_type_main-medium`
  const profileLinkInactive = `${styles.link} text text_type_main-medium text_color_inactive `

  const handlerLogout = () => {
    dispatch(logout());
    deleteCookie('refreshToken');
    deleteCookie('accessToken');
  }

  return (
    <aside className={styles.aside}>
      <NavLink
        end
        to="/profile"
        className={({ isActive }) =>
          isActive ? profileLinkActive : profileLinkInactive}
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) =>
          isActive ? profileLinkActive : profileLinkInactive}
      >
        История заказов
      </NavLink>
      <NavLink
        onClick={handlerLogout}
        to="/login"
        className={({ isActive }) =>
          isActive ? profileLinkActive : profileLinkInactive}
      >
        Выход
      </NavLink>
      <p className="text text_type_main-small text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
}

export default AsideMenu
