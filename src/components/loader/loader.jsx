import React from 'react';
import LoaderStyle from "./loader.module.css";

const Loader = () => {
  return (
    <div className={LoaderStyle.wrapper}>
      <span className={LoaderStyle.loader}></span>
      <p className="text text_type_main-default text_color_primary mt-8">Мы обрабатываем ваш заказ...</p>
    </div>
  )
}

export default Loader
