import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

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
        <label htmlFor="name">Your name</label>
        <Field 
          id="name" 
          name="name" 
          type="text" />
        <ErrorMessage 
          className="error" 
          name="name" c
          omponent="div" />
        <label htmlFor="email">Your email</label>
        <Field 
          id="email" 
          name="email" 
          type="email" />
        <ErrorMessage className="error" name="email" component="div" />
        <label htmlFor="amount">Quantity</label>
        <Field 
          id="amount" 
          name="amount" 
          type="number" />
        <ErrorMessage 
          className="error" 
          name="amount" 
          component="div" />
        <label htmlFor="currency">Currency</label>
        <Field
          id="currency"
          name="currency"
          as="select"
        >
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage 
          className="error" 
          name="currency" 
          component="div" />
        <label htmlFor="text">Your message</label>
        <Field
          id="text"
          name="text"
          as="textarea"
        />
       <ErrorMessage 
          className="error" 
          name="text" 
          component="div" />
        <label className="checkbox">
          <Field
            name="terms"
            type="checkbox"
          />
          Agree with the privacy policy?
        </label>
        <ErrorMessage 
          className="error" 
          name="terms" 
          component="div" />
        <button type="submit">Send</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
