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
     description:  'No description available.',
     decrease:"-",
     increase:"+",
     addToCart:'Add To Cart',
     productDescription:"Product Description",
     productDetails:"Product Details",
     category:"Category -",
     ratings:"Ratings :",
     reviewCount:"ReviewCount :",
     reviews:"reviews",
     closeIcon:"close",
     provideRatings:"Provide your ratings :",


    /*Profile Screen */
    logout:"Logout",
    accountInformation:"Account Info",
    profileWelcome:"Welcome, ",
    

    /*About Screen */

    /**WishlistScreen */
    wishlistEmptyText:"Your Wishlist is empty",
    wishlistHeading:"Wishlisted Products",
 
    /* Cart Screen*/
    checkOut: 'CheckOut',
    shoppingCart: "Shopping Cart",
    subTotal: "SubTotal :",
    taxGst:"Tax / GST :",
    totalAmount: "Total Amount :",
    shipping:'Shipping :',
    remove:"Remove",
    quantity:'Quantity',
    price:'Price',
    textSummary:"Cost Summary:",
    totalItems:"Total Items in your order :",
    emptyCart:"Your Cart is Empty !!",

    /**Delivery informtion */
    firstName:"FirstName",
    lastName:"LastName",
    pinCode:"PinCode",
    city:"City",
    state:"State",
    phoneNo:"Phone/MobileNo",
    address:"Address",
    houseFlat:"House/Flat/BuildingNo",
    country:'Country',
    save:"Save",
    edit:"Edit",

    //Confirmation Page
    orderconfirmed: "OrderConfirmed!!",
    persoName:"Name:",
    deliveryAddress:"Delivery Address:",
    phoneNumber:"Phone Number:",
    deliveredIn:"Delivered In:",
    paymentMethod:"Payment Method:",
    totalItemsOrdered:"Total Items:",
    amountTotalPaid:"Amount Total/Paid:",
    thanksMsg:"Thank you for your order, Shopping Again...",
    continueShopping: "Continue Shopping",
    giftIcon:"gift",
    

    //AccountInfo Page

    personalDetails:"Personal Details",
    userFirstName:"User First Name",
    userLastName:"User Last Name",
    userPhoneNo:"User Phone No",
    changePassword:"Change Password",
    newPassword:"New Password",
    oldPassword:"Old Password",
    confirmNewPassword:"Confirm New Password",
    eyeOffIcon:"eye-off",
    eyeIcon:"eye",

   //FeedBack
   submit:"Submit",
   textExperience:"How was your experience?",
   yourFeedback:"Write your feedback(optional)",
   happyOutlineIcon:"happy-outline",
   sadOutlineIcon:"sad-outline",
   thumbsupOutlineIcon:"thumbs-up-outline",
 /*ProductList Screen */
     highToLow:"Price: High → Low",
     lowToHigh:"Price: Low → High",
     sort:"Sort",

   //Filter Component
    filter:"Filters",
    apply:"Apply",
    reset:"Reset",
    range:"Range",
    men:"Men",
    women:"Women",
    jewellery:"Jewellery",
    
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
