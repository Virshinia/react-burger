import React from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun01 from '../../images/bun-01.png'
import bun02 from '../../images/bun-02.png'
import burgerConstructorStyle from "./burger-constructor.module.css";

const BurgerConstructor = () => {
        return (
            <section className="mt-25">
                    <ul className={burgerConstructorStyle.list}>
                        <li className={burgerConstructorStyle.blockedItem}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={200}
                                thumbnail={bun01}
                            />
                        </li>
                        <li className={burgerConstructorStyle.defaultItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={bun01}
                            />
                        </li>
                        <li className={burgerConstructorStyle.defaultItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type="bottom"
                                text="Краторная булка N-200i (низ)"
                                price={200}
                                thumbnail={bun02}
                            />
                        </li>
                        <li className={burgerConstructorStyle.blockedItem}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={200}
                                thumbnail={bun01}
                            />
                        </li>
                        <li className={burgerConstructorStyle.defaultItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type="bottom"
                                text="Краторная булка N-200i (низ)"
                                price={200}
                                thumbnail={bun02}
                            />
                        </li>
                        <li className={burgerConstructorStyle.defaultItem}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type="bottom"
                                text="Краторная булка N-200i (низ)"
                                price={200}
                                thumbnail={bun02}
                            />
                        </li>
                    </ul>
                <div className={burgerConstructorStyle.info}>
                    <span className={burgerConstructorStyle.total}>
                        <span className="text text_type_digits-medium">200</span>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </section>)
}

export default BurgerConstructor