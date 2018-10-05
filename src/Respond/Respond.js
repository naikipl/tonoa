export default (code, message) => {
  console.log(`RESPOND\n${code}: ${message}`)
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
}