import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropTypes, isBun } from "../../utils/constatants";
import PropTypes from "prop-types";

const ConstructorItem = ({item, style, type}) => {
    return (
        <li className={style}>
            {!isBun(item) && <DragIcon type="primary" />}
            <ConstructorElement
                isLocked={isBun(item.type)}
                type={type}
                text={item.name}
                price={item.price}
                thumbnail={item.image}/>
        </li>
    )
}
ConstructorItem.propTypes = {
    item: PropTypes.shape(ingredientPropTypes).isRequired,
    style: PropTypes.string.isRequired,
    type: PropTypes.string
};
export default ConstructorItem