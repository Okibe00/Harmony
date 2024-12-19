/**
 * @description validation schemas
 */
export const validateBrandDetails = {
  // manufacturer_name: {
  //   notEmpty: {
  //     errorMessage: 'Missing manufacturer name field',
  //   },
  //   escape: true,
  // },
  brand_name: {
    notEmpty: {
      errorMessage: 'Missing brand name field',
    },
    escape: true,
  },
  generic_name: {
    notEmpty: {
      errorMessage: 'Missing generic name field',
    },
    escape: true,
  },
  manufacturer_id: {
    notEmpty: {
      errorMessage: 'Missing manufacturer id field',
    },
    escape: true,
  },
  nafdac_no: {
    notEmpty: {
      errorMessage: 'Missing nafdac no field',
    },
    escape: true,
  },
  pack_size: {
    notEmpty: {
      errorMessage: 'Missing pack_size field',
    },
    escape: true,
  },
  drug_class: {
    notEmpty: {
      errorMessage: 'Missing drug class field',
    },
    escape: true,
  },
  category: {
    notEmpty: {
      errorMessage: 'Missing category field',
    },
    escape: true,
  },
  active_ingredients: {
    notEmpty: {
      errorMessage: 'Missing active ingredients field',
    },
    escape: true,
  },
  market_status: {
    notEmpty: {
      errorMessage: 'Missing market_status field',
    },
    escape: true,
  },
  dosage_form: {
    notEmpty: {
      errorMessage: 'Missing dosage form field',
    },
    escape: true,
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
      errorMessage: 'No name supplied',
    },
    notEmpty: {
      errorMessage: 'name cannot be empty',
    },
    isLength: {
      options: {
        max: 100,
        min: 3,
      },
      errorMessage: 'name must be between 3 and 100 characters',
    },
    escape: true,
  },
  country: {
    exists: {
      errorMessage: 'country must be supplied',
    },
    notEmpty: {
      errorMessage: 'country cannot be empty',
    },
    isLength: {
      options: {
        min: 4,
        max: 25,
      },
      errorMessage: 'country must be between 4 and 25 characters',
    },
    escape: true,
  },
};
// module.exports = {
//   validateBrandDetails,
//   validateDrugDetails,
//   validateUser,
//   validateManufacturer
// };
