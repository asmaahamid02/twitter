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

const convert_image_to_base64 = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return reader
}

const convert_images_to_base64 = async (files, imagesURLs) => {
  try {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(files[i])
      reader.onload = (readerEvent) => {
        imagesURLs.push(readerEvent.target.result)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
