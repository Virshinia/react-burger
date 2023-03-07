import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLink from "../header-link/header-link";

import headerStyles from './header.module.css';
import {useAppSelector} from "../../utils/hooks";

const Header = () => {
  const {name} = useAppSelector(store => store.user.userInfo);
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}><Logo /></div>
      <div className={headerStyles.wrapper}>
        <nav className={headerStyles.menu}>
          <HeaderLink to="/" icon="burger">Конструктор</HeaderLink>
          <HeaderLink to="/feed" icon="list">Лента заказов</HeaderLink>
        </nav>
        <HeaderLink to="/profile" icon="profile">{name || "Личный кабинет"}</HeaderLink>
      </div>
    </header>
  );
}

export default Header
