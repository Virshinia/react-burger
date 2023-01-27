import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "react-router-dom";
import styles from './header-link.module.css';

const HeaderLink = ({to, children, icon}) => {
  const iconActive = "primary";
  const iconInactive = "secondary";
  const linkActive = "text text_type_main-default";
  const linkInactive = "text text_type_main-default text_color_inactive"

  const IconSVG = ({icon, type}) => {
    if (icon === "burger") {
      return <BurgerIcon type={type} />
    } else if (icon === "profile") {
      return <ProfileIcon type={type} />
    } else {
      return <ListIcon type={type} />
    }
  }

  return (
    <NavLink
      to={to}
      className={styles.link}
    >
      {({isActive}) => (
        <>
          <IconSVG icon={icon} type={ isActive ? iconActive : iconInactive} />
          <span className={ isActive ? linkActive : linkInactive}>{children}</span>
        </>
      )}
    </NavLink>
  );
}

export default HeaderLink
