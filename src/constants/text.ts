export const textData={
    
    /*Splash Screen */
    appName:'EMart',

    /*Intro Screen */
    welcome: 'Welcome to ',
    ourMart: 'OUR MART',
    letShop: ". let's Shop!",
    next: "Next",
    previous: "Prev",
    getStarted:"Get Started",


    /*Login Screen */

   
    welcomeGreetiing: 'Welcome to E - Mart.',
    continue: 'Continue',
    skip:"Skip",
    emailPlaceholder:'Enter your email',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    resetPassword: 'Reset Password',
    loginText: 'Login',
    // account: "Don't have an account?",
    register:"Don't have an account? Register?",
    orLoginWith: 'OR Login with',
    termsAndConditions: 'By continuing you confirm that you agree with our Terms & Conditions',

    //greetings
    morning:'Good Morning !',
    evening:'Good Evening !',
    afternoon: 'Good AfterNoon !',

    /*SignUp Screen */
    signupText: 'Sign Up',
    subText: 'Hello there, sign up to continue.',
    login: 'Already have an account? Login ',
    fullNamePlaceholder: 'Enter your full name',
    reEnterPasswordPlaceholder: 'Re-enter your password',
    or: 'OR',
    name: 'Name',
    email:'Email',
    password: 'Password',
    confirmPassword: 'ConfirmPassword',

    /*Home Screen */
     greetingHome:'Welcome to Home Screen !',

     /*Product DetailScreen */
     description:  'No description available.'
    /*Profile Screen */

    /*About Screen */

    
}

export const error={
      name: 'Name is required',
      email:'Email is required',
      password:'Password is required',
      confirmPassword: 'Please confirm your password',
      nameMinCharcters: 'Name must be at least 3 characters',
      nameMaxCharacters: "Name cannot exceed 15 characters",
      nameValiadtion: 'Name must contain only alphabets(no space, dots,numbers or specail chars)',
      invalidEmail: 'Invalid email Address(eg: name@gmail.com)',
      passwordMinCharcters: "Password must be at least 8 characters",
      passwordlimit:  "Password cannot exceed 16 characters",
      passwordValidation: "Password must include 1 - uppercase, lowercase,number, special character and no spaces.",
      passwordConfirmValidation:"Passwords do not match",
}


export const toast ={

    //toast type
     typeSuccess:'success',
     typeError:'error',
     typeInfo:"info",
     position:'bottom',
    

    //login
     loginSuccess:'Login Successful',
     loginSucessText: 'Welcome!!',
     loginFailed:"Login Failed",
     loginFailedText: "Invalid username or password!",
     hometab:'HomeTab',

     //SignUp 
     signupTypeSuccess: 'success',
     signUpSuccess:'Form Submitted Successfully !',
     signUpSuccessText: 'Thank you, ',
     termConditionToastText: 'Terms and Conditions',
     acceptTermsConditionsToast: "Please accept the terms and conditions to proceed.",

 
}
export const termsAndConditions ={
    termsAndConditionsTitle : "Terms And Conditions !!",
    acceptTermsAndConditions: "To accept Terms & Conditons.",
    textForTermsAndConditions: "I Strongly agree with your Terms  & Conditions.",
    close:"CLOSE",
    
}

//key for storing user data
export const key ={
   userKey :"user",
   introKey:"introCompleted"
}
