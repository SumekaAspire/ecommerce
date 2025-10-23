
/**
 * Validates an email address.
 * @param email - The email address to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export const validateEmail = (email: string): string => {
  const emailRegex = /^[a-z][a-zA-Z0-9._-]*@[a-z]+\.[a-z]{2,4}$/;
  if (!email) {
    return "Email is required.";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.(eg: name@gmail.com)";
  }
  return "";
};

/**
 * Validates a password.
 * @param password - The password to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export const validatePassword = (password: string): string => {
  const passswordRegex=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+\-=()])[A-Za-z\d@$!%*?&+\-=()]{8,16}$/;
  if (!password) {
    return "Password is required.";
  }
  if(!passswordRegex.test(password)){
     return "Password must contain uppercase, lowercase, number, and special character, no spaces";
  }
  return "";
};

/**
 * Validates a name.
 * @param name - The name to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export const validateName = (name: string): string => {
  if (!name) {
    return "Name is required.";
  }
  if (name.length < 3) {
    return "Name must be at least 3 characters.";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name must contain only letters and spaces.";
  }
  return "";
};

/**
 * Validates if the confirm password matches the original password.
 * @param password - The original password.
 * @param confirmPassword - The confirm password to validate.
 * @returns An error message if invalid, otherwise an empty string.
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return "Confirm password is required.";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return "";
};



/**
 * Validation Rules
 */
export const validationRules = {
  //Email Validation
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-z][a-zA-Z0-9._-]*@[a-z]+\.[a-z]{2,4}$/,
      message: "Please enter a valid email address(eg: name@gmail.com)",
    },
  },

  //Password Validation
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 16,
      message: "Password cannot exceed 16 characters",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+\-=()])[A-Za-z\d@$!%*?&+\-=()]{8,16}$/,
      message:
        "Password must contain uppercase, lowercase, number, and special character, no spaces",
    },
  },

  //Name Validation
  name: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
    maxLength: {
      value: 15,
      message: "Name cannot exceed 15 characters",
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Name should contain alphabets and no spaces",
    },
  },

  
};
