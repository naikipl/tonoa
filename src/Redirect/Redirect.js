export default (url) => {
  if (url) {
    console.log(`REDIRECT\n${url}`)
    return {
      statusCode: 301,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Location": url
      }
    }
  } else {
    console.log(`RESPOND\n200`)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  }
}