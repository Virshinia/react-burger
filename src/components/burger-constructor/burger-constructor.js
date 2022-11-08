import React from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import bun01 from '../../images/bun-01.png'
import bun02 from '../../images/bun-02.png'
import burgerConstructorStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = () => {
    const num = Math.floor(Math.random() * 10000);
    const orderStatusText = "Ваш заказ начали готовить";
    const [orderStatus, setOrder] = React.useState(false);

    const toggleSetOrder = () => {
        setOrder(!orderStatus);
    }
    const modalForOrderDetails = (
        <Modal closeModal={toggleSetOrder}>
            <OrderDetails orderId={num} status={orderStatusText}/>
        </Modal>);

    return (
        <section className="mt-25">
            <ul className={burgerConstructorStyle.list}>
                <li className={burgerConstructorStyle.blockedItem}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={bun01}/>
                </li>
                <li className={burgerConstructorStyle.defaultItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={bun01}/>
                </li>
                <li className={burgerConstructorStyle.defaultItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="bottom"
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bun02}/>
                </li>
                <li className={burgerConstructorStyle.blockedItem}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={bun01}/>
                </li>
                <li className={burgerConstructorStyle.defaultItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="bottom"
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bun02}/>
                </li>
                <li className={burgerConstructorStyle.defaultItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="bottom"
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bun02}/>
                </li>
            </ul>
            <div className={burgerConstructorStyle.info}>
                <span className={burgerConstructorStyle.total}>
                        <span className="text text_type_digits-medium">200</span>
                        <CurrencyIcon type="primary" />
                    </span>
                <Button htmlType="button" type="primary" size="medium" onClick={toggleSetOrder}>
                        Оформить заказ
                        {orderStatus && modalForOrderDetails}
                    </Button>
            </div>
        </section>)
}

export default BurgerConstructor