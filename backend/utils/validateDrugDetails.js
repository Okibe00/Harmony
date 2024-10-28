export const validateDrugDetails = {
  query: {
    exists: {
      errorMessage: 'query is required'
    },
    notEmpty: {
      errorMessage: 'Provide a valid search string'
    },
  }
}
