import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from "@mui/material";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = (data) => {
    setLoading(true);
    setMessage(null);

    // Fake API call
    setTimeout(() => {
      setLoading(false);

      if (data.email === "admin@gmail.com" && data.password === "123456") {
        setMessage({ type: "success", text: "Login Successful!" });
      } else {
        setMessage({ type: "error", text: "Invalid Credentials" });
      }
    }, 2000);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        p: 3,
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" mb={2}>
        Login Form
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format"
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters"
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Box mt={2} position="relative">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            Login
          </Button>

          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                mt: "-12px",
                ml: "-12px"
              }}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;