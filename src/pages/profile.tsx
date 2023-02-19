import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import styles from './profile.module.css';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import AsideMenu from "../components/aside-menu/aside-menu";
import {changeUserInfo} from "../services/reducers/auth";

export const ProfilePage = () => {

  const {name, email, password} = useAppSelector(store => store.user.userInfo);
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

  const dispatch = useAppDispatch();
  const onChange: React.ChangeEventHandler<HTMLInputElement>  = e => {
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
        <Input
          onChange={onChange}
          value={form.email}
          name='email'
          icon='EditIcon'
        />
        <PasswordInput
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
