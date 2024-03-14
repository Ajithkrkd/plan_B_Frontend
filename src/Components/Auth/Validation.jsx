import React from 'react';
import Typography from '@mui/material/Typography';

const validate = (formData) => {
  const errors = {};

  if(formData.fullName.trim() === ''){
    errors.fullName = 'Full name must not be empty'
  }
  if(formData.phoneNumber.trim() === ''){
    errors.phoneNumber = 'Phone number must not be empty'
  }
  if (formData.fullName && formData.fullName.length < 5) {
    errors.fullName = 'Full name must be at least 5 characters long.';
  }

  const phoneRegex = /^\d{10}$/; // Only 10 digits allowed
  if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
    errors.phoneNumber = 'Phone number must be 10 digits and only numbers.';
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[^\s]{8,}$/; // At least 8 chars, 1 digit, 1 letter
  if (formData.password && !passwordRegex.test(formData.password)) {
    errors.password =
      'Password must be at least 8 characters long, containing at least one digit and one letter.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.email = 'Invalid email format.';
  }

  return errors;
};

const renderError = (error) => {
  if (error) {
    return <Typography variant="caption" color="error">{error}</Typography>;
  }
  return null;
};

export { validate, renderError };
