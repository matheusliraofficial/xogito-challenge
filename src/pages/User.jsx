import React, { useState } from "react";
import { insertUser } from "../store/slices/users";
import { isEmailValid } from "../utils/isEmailValid";
import { useNavigate } from "react-router-dom";
import { useStore, useDispatch } from "react-redux";
import { TextField, Button, Grid } from "@mui/material";

const UserPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [emailValidation, setIsEmailValidation] = useState({
    isEmailUnique: true,
    isEmailValid: true,
  });

  const store = useStore();
  const dispatch = useDispatch();
  const { users } = store.getState();

  const handleChangeName = ({ target }) => {
    setName(target.value);
  };

  const checkIfEmailIsUnique = (email) => !users.some((user) => user.email === email);

  const handleChangeEmail = ({ target }) => {
    const emailValue = target.value;
    
    setIsEmailValidation({
      isEmailUnique: checkIfEmailIsUnique(emailValue),
      isEmailValid: isEmailValid(emailValue),
    });

    setEmail(emailValue);
  };

  const isEmailInvalid = () => !Object.values(emailValidation).every(Boolean)

  const isFormInvalid = () =>
    isEmailInvalid() || !Boolean(name);

  const handleSubmit = () => {
    const user = {
      name,
      email,
    };

    dispatch(insertUser(user));
    navigate("/");
  };

  return (
    <Grid container component="form" direction="column" maxWidth="xl">
      <TextField
        type="text"
        label="Name"
        variant="outlined"
        sx={{ my: 2 }}
        value={name}
        onChange={handleChangeName}
      />
      <TextField
        type="email"
        label="E-mail"
        variant="outlined"
        sx={{ pb: 2 }}
        value={email}
        onChange={handleChangeEmail}
        {...(isEmailInvalid() && {
          error: true,
          helperText: emailValidation.isEmailUnique ? "Invalid e-mail" : "E-mail already exists",
        })}
      />
      <Button
        disabled={isFormInvalid()}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Save User
      </Button>
    </Grid>
  );
};

export default UserPage;
