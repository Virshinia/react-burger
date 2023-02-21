import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import {store, RootState} from "../services/store";


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useForm<T>(inputValues: T) {

  const [values, setValues] = useState(inputValues);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
