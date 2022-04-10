import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import * as Yup from "yup";
import FormikBody from "../common/FormikBody";
import FormikField from "../common/FormikField";
import { login } from "../../store/slices/authSlice";
import { clearMessage } from "../../store/slices/messageSlice";
import validationErrors from "../../config/validationErrors";
import routes from "../../config/routes";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { text: formMsg } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { panel, home, register } = routes;

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
    password: Yup.string().required(validationErrors.requiredError),
  });

  const handleLogin = async (formValue) => {
    const { username, password } = formValue;
    setLoading(true);
    try {
      await dispatch(login({ username, password })).unwrap();
      navigate(panel.concat(home)); // means navigate("/panel/home")
    } catch (error) {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={`${panel}${home}`} />;
  }
  return (
    <div className="blue-gradient">
      <div className="card-form">
        <div className="card">
          <FormikBody
            initialValues={initialValues}
            validationSchema={validationSchema}
            handleForm={handleLogin}
            loading={loading}
            formMsg={formMsg}
            buttonLabel="Login"
            buttonColor="primary"
          >
            <FormikField name="username" label="Email" type="text" />
            <FormikField name="password" label="Password" type="password" />
          </FormikBody>
          <br></br>
          <div className="card card-container text-center">
            <span>
              <Link className="page-link" to={register}>
                Don't have an account?
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
