import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className="form-control"
        id={field.name}
        placeholder={label}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({...props, type: 'checkbox'});
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...props} {...field} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "It's must be more than two characters!")
          .required("Required field!"),
        email: Yup.string()
          .email("Invalid email format.")
          .required("Required field!"),
        amount: Yup.number()
          .min(5, "It's must be more than five!")
          .required("Required field!"),
        currency: Yup.string().required("Choose a currency"),
        text: Yup.string().min(10, "It's must be more than 10 characters!"),
        terms: Yup.boolean()
          .oneOf([true], "You must agree to terms and conditions")
          .required("You must agree to terms and conditions"),
      })}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      <Form className="form">
        <h2>Send donations</h2>
       <MyTextInput
            label="Your name"
            id="name" 
            name="name" 
            type="text"
        />
       <MyTextInput
            label="Your email"
            id="email" 
            name="email" 
            type="email"
        />
        <label htmlFor="amount">Quantity</label>
        <Field 
            id="amount" 
            name="amount" 
            type="number" />
        <ErrorMessage className="error" name="amount" component="div" />
        <label htmlFor="currency">Currency</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div" />
        <label htmlFor="text">Your message</label>
        <Field 
            id="text" 
            name="text" as="textarea" 
        />
        <ErrorMessage className="error" name="text" component="div" />
    
        <MyCheckbox name="terms"> 
               Agree with the privacy policy?
        </MyCheckbox>
        <button type="submit">Send</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
