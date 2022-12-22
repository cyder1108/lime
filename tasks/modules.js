module.exports = {

  line: ( char = "-", len = 60 ) => {
    result = ``;
    for( let i = 0; i < len; i++ ) result += char
    return result
  }

}
