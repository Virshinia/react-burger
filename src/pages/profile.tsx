import React, {useState, ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector, useForm} from "../utils/hooks";
import styles from './profile.module.css';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import AsideMenu from "../components/aside-menu/aside-menu";
import {changeUserInfo} from "../services/reducers/auth";
import {IPersonalInformationForm} from "../utils/common-interfaces";

export const ProfilePage = () => {

  const {userInfo} = useAppSelector(store => store.user);
  const [isChanged, setChanging] = useState(false);
  const {values, handleChange, setValues } = useForm<IPersonalInformationForm>(userInfo);

  const onClick = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setChanging(true);
  }

  const dispatch = useAppDispatch();
  const handleUpdateUserInfo = () => {
    dispatch(changeUserInfo(values))
    setChanging(false);
  }

  const handleResetUserInfo = () => {
    setValues(userInfo);
    setChanging(false);
  }

  return (
    <main className={styles.wrapper}>
      <AsideMenu/>
      <form className={styles.form}>
        <Input
          placeholder='Имя'
          onChange={onClick}
          value={values.name}
          name='name'
          icon='EditIcon'
        />
        <Input
          onChange={onClick}
          value={values.email}
          name='email'
          icon='EditIcon'
        />
        <PasswordInput
          onChange={onClick}
          value={values.password}
          name='password'
          icon='EditIcon'
          size='default'
          disabled={false}
        />
        {isChanged &&
          <div className={styles.buttons}>
            <Button onClick={handleResetUserInfo} htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button onClick={handleUpdateUserInfo} htmlType="button" type="primary" size="medium">
              Сохранить
            </Button>
          </div>}
      </form>
    </main>
  );
}
