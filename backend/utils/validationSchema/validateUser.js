const validateUser = {
  user_name: {
    exists: {
      errorMessage: 'Missing user name'
    },
    notEmpty: {
      errorMessage: 'user name cannot be empty'
    },
    isLength: {
     options: {min: 4, max: 25},
      errorMessage: 'User name must be atleast 4 characters'
    }
  },
  password: {
    exists: {
      errorMessage: 'Missing password field'
    },
    isLength: {
      options: {
        min: 8,
        max: 16
      },
    },
  },
  email: {
    exists: {
      errorMessage: 'Missing email field'
    },
    isEmail: {
      errorMessage: 'Provide an email address'
    }
  }
}
export default validateUser;
