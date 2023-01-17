import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import styles from './profile.module.css';
import {Input, EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import AsideMenu from "../components/aside-menu/aside-menu";
import {changeUserInfo} from "../services/reducers/auth";

export const ProfilePage = () => {

  const {name, email, password} = useSelector(store => store.user.userInfo);
  const initialState = {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`
  }
  const [form, setValue] = useState(initialState);

  useEffect(() => {
    setValue(form)
    }, [form, name, email, password])


  const [isChanged, setChanging] = useState(false);

  const dispatch = useDispatch();
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setChanging(true);
  };

  const handleUpdateUserInfo = () => {
    dispatch(changeUserInfo(form))
    setChanging(false);
  }

  const handleResetUserInfo = () => {
    setValue(initialState)
    setChanging(false);
  }

  return (
    <main className={styles.wrapper}>
      <AsideMenu/>
      <form className={styles.form}>
        <Input
          placeholder='Имя'
          onChange={onChange}
          value={form.name}
          name='name'
          icon='EditIcon'
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name='email'
          icon='EditIcon'
        />
        <PasswordInput
          type='password'
          onChange={onChange}
          value={form.password}
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
