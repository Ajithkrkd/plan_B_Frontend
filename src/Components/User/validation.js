export const forgottPasswordValidation =(formData)=>{

    const errors ={};

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[^\s]{8,}$/; 
    if(formData.currentPassword === ''){
        errors.currentPassword = 'current password is empty'
    }
    if(formData.newPassword === ''){
        errors.newPassword = 'new password is empty'
    }
    if(formData.confirmPassword === ''){
        errors.confirmPassword = 'confirm Password is empty'
    }
    if (formData.currentPassword && !passwordRegex.test(formData.currentPassword)) {
      errors.currentPassword =
        'Password must be at least 8 characters long, containing at least one digit and one letter.';
    }
    if (formData.newPassword && !passwordRegex.test(formData.newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters long, containing at least one digit and one letter.';
    }
    if (formData.confirmPassword && !passwordRegex.test(formData.confirmPassword)) {
      errors.confirmPassword =
        'Password must be at least 8 characters long, containing at least one digit and one letter.';
    }
    if (formData.newPassword !== formData.confirmPassword) { 
      errors.confirmPassword = 'Password not matching';
    }
    return errors;

  }