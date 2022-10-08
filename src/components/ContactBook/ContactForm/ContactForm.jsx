import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter the name')
    .min(3, 'Name must have more the 3 letter')
    .max(30, 'Name must have less then 30 letter')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: Yup.string()
    .required('Please enter the number')
    .min(6, 'Number of phone must have more then 6 number')
    .max(14, 'Number of phone must have less then 15 number')
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});
export const ContactForm = ({ onSubmitForm }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmitForm(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Name
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage name="name" />
        </label>
        <label className={css.label}>
          Number
          <Field className={css.input} type="tel" name="number" />
          <ErrorMessage name="number" />
        </label>
        <button className={css.btnSubmit} type="submit">
          add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
