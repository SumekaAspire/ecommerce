
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
 * passwordMust have: 1 uppercase letter,1 lowercase letter, 1 number,1 special character,8–16 total characters,Only allowed characters (no spaces)
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



//AddressDelivery component Validations:

export const validateFirstName = (name: string): string => {
  if (!name.trim()) return "Required.";
  if (name.length < 3) return "At least 3 characters.";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Enter valid firstname.";
  return "";
};

export const validateLastName = (name: string): string => {
  if (!name.trim()) return "Required*.";
  if (name.length < 0) return "At least 1 characters.";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Enter valid lastname.";
  return "";
};

export const validateAddress = (value: string): string => {
  if (!value.trim()) return "Required*.";
  const allowedPattern = /^(?!\s)[A-Za-z0-9 ,.\-/:\n]+$/;
  if (!allowedPattern.test(value)) {
    return "Only letters, numbers, spaces, , . - / : are allowed.";
  }
  return "";
};

export const validateCity = (city: string): string => {
  if (!city.trim()) return "Required*.";
  if (!/^[A-Za-z\s]+$/.test(city)) return "Enter a valid city.";
  return "";
};
export const validateCountry = (country: string): string => {
  if (!country.trim()) return "Required*.";
  if (country.length < 2) return "At least 3 characters.";
  if (!/^[A-Za-z\s]+$/.test(country)) return "Enter valid Country.";
  return "";
};

export const validateState = (state: string): string => {
  if (!state.trim()) return "Required*.";
  if (!/^[A-Za-z\s]+$/.test(state)) return "Enter a valid state.";
  return "";
};

export const validatePincode = (pincode: string): string => {
  if (!pincode.trim()) return "Required*.";
  if (!/^6\d{5}$/.test(pincode)) return "Enter 6-digit, starts with 6.";
  return "";
};

export const validatePhone = (phone: string): string => {
  if (!phone.trim()) return "Required*.";
  if (!/^[6-9]\d{9}$/.test(phone)) return "Enter 10-digit number.";
  return "";
};


//ProfileScreen

export const validateAddressProfileScreen = (value: string): string => {
  if (!value.trim()) return "Address is required.";
  if (/^\s/.test(value)) return "Address cannot start with a space.";
  const allowedPattern = /^[A-Za-z0-9 .,\-`':/]+$/;
  if (!allowedPattern.test(value)) {
    return "Invalid characters entered.";
  }
  return "";
};
