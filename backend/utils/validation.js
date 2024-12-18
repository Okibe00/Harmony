/**
 * @description validation schemas
 */
export const validateBrandDetails = {
  manufacturer_name: {
    notEmpty: {
      errorMessage: 'Missing manufacturer name field',
    },
  },
  brand_name: {
    notEmpty: {
      errorMessage: 'Missing brand name field',
    },
  },
  generic_name: {
    notEmpty: {
      errorMessage: 'Missing generic name field',
    },
  },
  manufacturer_id: {
    notEmpty: {
      errorMessage: 'Missing manufacturer id field',
    },
  },
  nafdac_no: {
    notEmpty: {
      errorMessage: 'Missing nafdac no field',
    },
  },
  pack_size: {
    notEmpty: {
      errorMessage: 'Missing pack_size field',
    },
  },
  drug_class: {
    notEmpty: {
      errorMessage: 'Missing drug class field',
    },
  },
  category: {
    notEmpty: {
      errorMessage: 'Missing category field',
    },
  },
  active_ingredients: {
    notEmpty: {
      errorMessage: 'Missing active ingredients field',
    },
  },
  market_status: {
    notEmpty: {
      errorMessage: 'Missing market_status field',
    },
  },
  dosage_form: {
    notEmpty: {
      errorMessage: 'Missing dosage form field',
    },
  },
};
export const validateDrugDetails = {
  query: {
    exists: {
      errorMessage: 'query is required',
    },
    notEmpty: {
      errorMessage: 'Provide a valid search string',
    },
  },
};

export const validateUser = {
  user_name: {
    exists: {
      errorMessage: 'Missing user name',
    },
    notEmpty: {
      errorMessage: 'user name cannot be empty',
    },
    isLength: {
      options: { min: 4, max: 25 },
      errorMessage: 'User name must be atleast 4 characters',
    },
  },
  password: {
    exists: {
      errorMessage: 'Missing password field',
    },
    isLength: {
      options: {
        min: 8,
        max: 16,
      },
    },
  },
  email: {
    exists: {
      errorMessage: 'Missing email field',
    },
    isEmail: {
      errorMessage: 'Provide an email address',
    },
  },
};

// Manufacturer schema
export const validateManufacturer = {
  name: {
    exists: {
      errorMessage: 'No name supplied'
    },
    notEmpty: {
      errorMessage: 'name cannot be empty'
    },
    isLength: {
      options: {
        max: 100,
        min: 3
      },
      errorMessage: 'name must be between 3 and 100 characters'
    },
    escape: true
  },
  country: {
    exists: {
      errorMessage: 'country must be supplied'
    },
    notEmpty: {
      errorMessage: 'country cannot be empty'
    },
    isLength: {
      options: {
        min: 4,
        max: 25
      },
    errorMessage: 'country must be between 4 and 25 characters'
    },
    escape: true
  }
}
// module.exports = {
//   validateBrandDetails,
//   validateDrugDetails,
//   validateUser,
//   validateManufacturer
// };
