function catchError(ex) {
  if(ex.notRealError)
  {
    console.log(ex)
  }
}

module.exports = {
  catchError: catchError,
  noRealError: { noRealError: true }
}