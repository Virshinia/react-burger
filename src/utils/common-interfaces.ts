import {MutableRefObject} from "react";

export interface IIngredientPropTypes {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  carbohydrates: number;
  fat: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string,
  image_large: string,
  __v: number;
}

export type TIngredientDetails = Omit<IIngredientPropTypes, "_id" | "type" | "price" |"image" |"image_mobile" | "__v">;

export interface IUser {
  readonly email: string;
  readonly name: string;
}

export type TIngredients = {
  readonly data: Array<IIngredientPropTypes>
}

export interface IPersonalInformationForm  {
  name: string;
  email: string;
  password: string
}

export type TLoginForm = Omit<IPersonalInformationForm, "name">

export interface ITabRefs {
  bunRef: MutableRefObject<HTMLHeadingElement | null>;
  sauceRef: MutableRefObject<HTMLHeadingElement | null>;
  mainRef: MutableRefObject<HTMLHeadingElement| null>;
}
