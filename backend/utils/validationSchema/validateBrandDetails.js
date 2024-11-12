const validateBrandDetails = {
  manufacturer_name: {
    notEmpty:{
      errorMessage: 'Missing manufacturer name field'
    }
  },
  brand_name: {
    notEmpty:{
      errorMessage: 'Missing brand name field'
    }
  },
  generic_name: {
    notEmpty:{
      errorMessage: 'Missing generic name field'
    }
  },
  manufacturer_id: {
    notEmpty:{
      errorMessage: 'Missing manufacturer id field'
    }
  },
  nafdac_no: {
    notEmpty:{
      errorMessage: 'Missing nafdac no field'
    }
  },
  pack_size: {
    notEmpty:{
      errorMessage: 'Missing pack_size field'
    }
  },
  drug_class: {
    notEmpty:{
      errorMessage: 'Missing drug class field'
    }
  },
  category: {
    notEmpty:{
      errorMessage: 'Missing category field'
    }
  },
  active_ingredients: {
    notEmpty:{
      errorMessage: 'Missing active ingredients field'
    }
  },
  market_status: {
    notEmpty:{
      errorMessage: 'Missing market_status field'
    }
  },
  dosage_form: {
    notEmpty:{
      errorMessage: 'Missing dosage form field'
    }
  }
}
export default validateBrandDetails;
