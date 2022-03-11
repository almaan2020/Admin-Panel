import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import FormikBody from "../../common/FormikBody";
import FormikField from "../../common/FormikField";
import { editUser } from "../../../store/slices/userSlice";
import { clearMessage } from "../../../store/slices/messageSlice";
import validationErrors from "../../../config/validationErrors";

const EditUser = () => {
  const [loading, setLoading] = useState(false);
  const { text: formMsg } = useSelector((state) => state.message);
  const { userList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  //read user id from query-string
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //set user fields in state
  const [userFields, setUserFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  useEffect(() => {
    const user = {
      first_name: userList.filter((user) => user.id === Number(id))[0]
        .first_name,
      last_name: userList.filter((user) => user.id === Number(id))[0].last_name,
      email: userList.filter((user) => user.id === Number(id))[0].email,
    };
    setUserFields(user);
  }, [id, userList]);

  //fill form fields by user fields
  const initialValues = {
    first_name: userFields.first_name,
    last_name: userFields.last_name,
    email: userFields.email,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(validationErrors.requiredError),
    last_name: Yup.string().required(validationErrors.requiredError),
    email: Yup.string()
      .email(validationErrors.emailError)
      .required(validationErrors.requiredError),
  });

  const handleEdit = async (formValue) => {
    const { first_name, last_name, email } = formValue;
    setLoading(true);
    try {
      await dispatch(editUser({ id, first_name, last_name, email })).unwrap();
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
        handleForm={handleEdit}
        loading={loading}
        formMsg={formMsg}
        buttonLabel="Edit"
        buttonColor="darkblue"
      >
        <FormikField name="first_name" label="FirstName" type="text" />
        <FormikField name="last_name" label="Lastname" type="text" />
        <FormikField name="email" label="Email" type="text" />
      </FormikBody>
    </div>
  );
};
export default EditUser;
