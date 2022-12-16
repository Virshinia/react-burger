import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabSectionStyle from './tab-section.module.css'
import {INGREDIENT_TYPES, SAUCE, MAIN} from "../../utils/constatants";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentTab} from "../../services/reducers/tab-section"
import PropTypes from "prop-types";

const TabSection = ({refs}) => {
  const dispatch = useDispatch();
  const current = useSelector(store => store.tab.current);
  const {bunRef, mainRef, sauceRef} = refs;

  const tabClick = (tab) => {
    let currentHeading
    switch (tab) {
      case SAUCE:
        currentHeading = sauceRef.current;
        break;
      case MAIN:
        currentHeading = mainRef.current;
        break;
     default:
       currentHeading = bunRef.current;
    }

    currentHeading.scrollIntoView({behavior: "smooth"});
    dispatch(setCurrentTab(tab))
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

TabSection.propTypes = {
  refs: PropTypes.object.isRequired
};

export default TabSection
