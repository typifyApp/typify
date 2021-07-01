function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

type EmailValidationType = {
  helperText: string;
  errorText: string;
    successText: string;
  isValid: (value: string) => boolean;
};
type PasswordValidationType = {
    helperText: string;
  errorText: string;
    successText: string;
    passwordDontMatch: string;
    passwordMatch: string;
    
    isValid: (value: string) => boolean;
  
}
export const emailValidation: EmailValidationType = {
  helperText: 'Enter your email',
  errorText: 'Invalid Email',
  successText: 'Valid Email',
  isValid: validateEmail
};
function validatePassword(password: string) {
  return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) != null;
}
export const passwordValidation: PasswordValidationType = {
  helperText: 'Enter your password',
  errorText: 'Min 8 chars, at least 1 letter & 1 num',
    successText: 'Valid Password',
    passwordDontMatch: "Passwords do not match",
  passwordMatch: "Passwords match",
  isValid: validatePassword
};
