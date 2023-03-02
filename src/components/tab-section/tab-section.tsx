import React, {FC} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabSectionStyle from './tab-section.module.css'
import {INGREDIENT_TYPES, SAUCE, MAIN} from "../../utils/constatants";
import {useAppSelector, useAppDispatch} from "../../utils/hooks";
import {setCurrentTab} from "../../services/reducers/tab-section"
import {ITabRefs} from "../../utils/common-interfaces";


const TabSection: FC<{refs: ITabRefs}> = ({refs}) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(store => store.tab.current);
  const {bunRef, mainRef, sauceRef} = refs;

  const tabClick = (tab: string) => {
    let currentHeading;
    tab === SAUCE ?
      currentHeading = sauceRef.current :
      tab === MAIN ? currentHeading = mainRef.current :
        currentHeading = bunRef.current;

    currentHeading !== null && currentHeading.scrollIntoView({behavior: "smooth"});
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

export default TabSection
