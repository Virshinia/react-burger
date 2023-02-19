import React, {FC} from 'react';
import LoaderStyle from "./loader.module.css";

const Loader:FC<{text?: string}> = ({text}) => {
  return (
    <div className={LoaderStyle.wrapper}>
      <span className={LoaderStyle.loader}></span>
      {text && <p className="text text_type_main-default text_color_primary mt-8">{text}</p>}
    </div>
  )
}

export default Loader
