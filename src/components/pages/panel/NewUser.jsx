import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import FormikBody from "../../common/FormikBody";
import FormikField from "../../common/FormikField";
import { create } from "../../../store/slices/userSlice";
import { clearMessage } from "../../../store/slices/messageSlice";
import validationErrors from "../../../config/validationErrors";

const NewUser = () => {
  const [loading, setLoading] = useState(false);
  const { text: formMsg } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(validationErrors.requiredError),
    last_name: Yup.string().required(validationErrors.requiredError),
    email: Yup.string()
      .email(validationErrors.emailError)
      .required(validationErrors.requiredError),
  });

  const handleCreate = async (formValue) => {
    const { first_name, last_name, email } = formValue;
    setLoading(true);
    try {
      await dispatch(create({ first_name, last_name, email })).unwrap();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-sm card border-light col-sm-6">
      <FormikBody
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleForm={handleCreate}
        loading={loading}
        formMsg={formMsg}
        buttonLabel="Create"
        buttonColor="darkblue"
      >
        <FormikField name="first_name" label="FirstName" type="text" />
        <FormikField name="last_name" label="Lastname" type="text" />
        <FormikField name="email" label="Email" type="text" />
      </FormikBody>
    </div>
  );
};
export default NewUser;
