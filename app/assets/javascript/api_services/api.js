const base_url =
  window.location.protocol + '//' + window.location.host + '/twitter'
const api = base_url + '/backend/apis/'

//post fetch
const fetch_api = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams(data),
  })
  return response.json()
}
