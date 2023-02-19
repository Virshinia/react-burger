import React, {FC} from 'react';
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import { NavLink } from "react-router-dom";
import styles from './header-link.module.css';

interface IHeaderLinkProps {
  to: string;
  children: string | number;
  icon: string
}

type TIcon = Omit<IHeaderLinkProps, "children" | "to"> & TIconProps;

const HeaderLink:FC<IHeaderLinkProps> = ({to, children, icon}) => {
  const linkActive = "text text_type_main-default";
  const linkInactive = "text text_type_main-default text_color_inactive"

  const IconSVG:FC<TIcon> = ({icon, type}) => {
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
          <IconSVG icon={icon} type={ isActive ? "primary" : "secondary"} />
          <span className={ isActive ? linkActive : linkInactive}>{children}</span>
        </>
      )}
    </NavLink>
  );
}

export default HeaderLink
