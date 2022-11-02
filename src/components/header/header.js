import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './header.module.css';

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}><Logo /></div>
            <div className={headerStyles.wrapper}>
                <nav className={headerStyles.menu}>
                    <a className={headerStyles.link} href="/#">
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default">Конструктор</span>
                    </a>
                    <a className={headerStyles.link} href="/#">
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
                    </a>
                </nav>
                <a className={headerStyles.link} href="/#">
                    <ProfileIcon type="secondary" />
                    <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
                </a>
            </div>
        </header>
    );
}

export default Header