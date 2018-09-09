export default (url) => {
  console.log(`REDIRECT\n${url}`)
  return {
    statusCode: 301,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Location": url
    }
  }
}