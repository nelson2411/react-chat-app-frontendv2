const baseUrl = process.env.REACT_APP_API_URL

export const fetchWhitoutToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`
  if (method === "GET") {
    const resp = await fetch(url)
    return await resp.json()
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return await resp.json()
  }
}

export const fetchWithToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`
  const token = localStorage.getItem("token") || "" // get the token from the local storage and we make sure it is not null
  if (method === "GET") {
    const resp = await fetch(url, {
      headers: {
        "x-token": token, // x-token means the token is coming from the headers
      },
    })
    return await resp.json()
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    })
    return await resp.json()
  }
}
