import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabSectionStyle from './tab-section.module.css'
import {INGREDIENT_TYPES} from "../../utils/constatants";
import {useDispatch, useSelector} from "react-redux";
import {SET_CURRENT} from "../../services/actions/tab-section";

const TabSection = () => {
  const dispatch = useDispatch();
  const current = useSelector(store => store.tab.current);

  const tabClick = (tab) => {
   document.querySelector(`#${tab}-heading`).scrollIntoView({behavior: "smooth"});
   dispatch(SET_CURRENT(tab))
  };

  const createTabs = () => {
    return INGREDIENT_TYPES.map((group) => (
      <Tab key={group.type} value={group.type} active={current === `${group.type}`} onClick={tabClick}>
        {group.name}
      </Tab>
    ))
  }

  return (
    <div className={tabSectionStyle.nav}>
      {createTabs()}
    </div>)
}

export default TabSection
