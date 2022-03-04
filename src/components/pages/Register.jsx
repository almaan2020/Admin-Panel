import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormikBody from "../common/FormikBody";
import FormikField from "../common/FormikField";
import { register } from "../../store/slices/authSlice";
import { clearMessage } from "../../store/slices/messageSlice";
import validationErrors from "../../config/validationErrors";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { text: formMsg } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email(validationErrors.emailError)
      .required(validationErrors.requiredError),
    password: Yup.string()
      .test(
        "len",
        "The password must be 6 or more characters!",
        (val) => val && val.toString().length >= 6
      )
      .required(validationErrors.requiredError),
  });

  const handleRegister = async (formValue) => {
    const { username, password } = formValue;
    setLoading(true);
    try {
      await dispatch(register({ username, password })).unwrap();
      navigate("/login");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="blue-gradient">
      <div className="card-form">
        <div className="card">
          <FormikBody
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleForm={handleRegister}
            loading={loading}
            formMsg={formMsg}
            buttonLabel="Sign up"
            buttonColor="primary"
          >
            <FormikField name="username" label="Email" type="text" />
            <FormikField name="password" label="Password" type="password" />
          </FormikBody>
        </div>
      </div>
    </div>
  );
};
export default Register;
