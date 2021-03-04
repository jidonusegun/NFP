import {useState} from 'react';
import { convertToFormData } from "../utils";

function useForm(submitAction) {
  const [values, setValue] = useState({});
  const getData = (e) => {
    setValue({
      ...values,
      [e.target.id || e.target.name]: e.target.value || e.target.checked,
    });
  };
  const getDataPost = (e) => {
    setValue({
      ...values,
      [e.target.name || e.target.id]: e.target.value || e.target.checked,
    });
  };
  const getEditor = (body, name) => {
    values[name] = body; 
    setValue({ ...values });
  };
  const setData = (field, data) => {
    values[field] = data;
    setValue({ ...values });
  };
  const check = (e) => { 
    setValue({
      ...values,
      [e.target.id]: e.target.checked,
    });
  };
  const getFile = (e) => {
    setValue({
      ...values,
      [e.target.id]: e.target.files[0]
    });
  };
  const filter = (record = null) => {
    const filledValues = record || values;
    Object.keys(filledValues).forEach((key) => {
      if (!filledValues[key]) delete filledValues[key];
    });
    if (record) return filledValues;
    setValue(filledValues);
  };
  const submit = (e) => {
    e.preventDefault();
    submitAction();
  };
  const setDefault = (defaultValues) => {
    setValue({ ...values, ...defaultValues });
  };
  const formData = () => {
    return convertToFormData(values);
  };
  return {
    values,
    getData,
    setData,
    check,
    getDataPost,
    submit,
    getFile,
    setDefault,
    formData,
    getEditor,
    filter,
  };
}

export default useForm;
