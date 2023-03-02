import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLink from "../header-link/header-link";

import headerStyles from './header.module.css';

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}><Logo /></div>
      <div className={headerStyles.wrapper}>
        <nav className={headerStyles.menu}>
          <HeaderLink to="/" icon="burger">Конструктор</HeaderLink>
          <HeaderLink to="/feed" icon="list">Лента заказов</HeaderLink>
        </nav>
        <HeaderLink to="/profile" icon="profile">Личный кабинет</HeaderLink>
      </div>
    </header>
  );
}

export default Header
