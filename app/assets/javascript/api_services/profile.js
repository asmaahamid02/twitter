const edit_profile_form = document.querySelector('#edit-popup')

const profile_img = document.querySelector('#default-profile-img-btn')
const cover_img = document.querySelector('#default-profile-bg-btn')

const edit_profile = (data_obj) => {
  const reader_profile = profile_img.files[0]
    ? convert_image_to_base64(profile_img.files[0])
    : ''
  const reader_cover = cover_img.files[0]
    ? convert_image_to_base64(cover_img.files[0])
    : ''

  if (reader_cover && reader_profile) {
    reader_profile.addEventListener('load', () => {
      let base64URL_profile = reader_profile.result
      data_obj['profile'] = base64URL_profile
      reader_cover.addEventListener('load', () => {
        let base64URL_cover = reader_cover.result
        data_obj['cover'] = base64URL_cover
        fetch_api(api + 'edit_profile.php', data_obj)
          .then((data) => {
            console.log(data)
            if (data.success) {
              console.log(data.success)
            } else {
              console.log(data.error ? data.error : data.empty)
            }
          })
          .catch((error) => console.log(error))
      })
    })
  } else if (reader_cover && !reader_profile) {
    reader_cover.addEventListener('load', () => {
      let base64URL_cover = reader_cover.result
      data_obj['cover'] = base64URL_cover
      fetch_api(api + 'edit_profile.php', data_obj)
        .then((data) => {
          console.log(data)
          if (data.success) {
            console.log(data.success)
          } else {
            console.log(data.error ? data.error : data.empty)
          }
        })
        .catch((error) => console.log(error))
    })
  } else if (!reader_cover && reader_profile) {
    reader_profile.addEventListener('load', () => {
      let base64URL_profile = reader_profile.result
      data_obj['profile'] = base64URL_profile
      fetch_api(api + 'edit_profile.php', data_obj)
        .then((data) => {
          console.log(data)
          if (data.success) {
            console.log(data.success)
          } else {
            console.log(data.error ? data.error : data.empty)
          }
        })
        .catch((error) => console.log(error))
    })
  } else {
    fetch_api(api + 'edit_profile.php', data_obj)
      .then((data) => {
        console.log(data)
        if (data.success) {
          console.log(data.success)
          setTimeout(() => {
            lwindow.location.href = window.location.href
          }, 700)
        } else {
          console.log(data.error ? data.error : data.empty)
        }
      })
      .catch((error) => console.log(error))
  }
}

edit_profile_form.addEventListener('submit', (e) => {
  e.preventDefault()

  const new_name = document.querySelector('#new-name').value
  const new_bio = document.querySelector('#new-bio').value
  const new_location = document.querySelector('#new-location').value
  const new_url = document.querySelector('#new-url').value

  let data_obj = {
    id: JSON.parse(localStorage.getItem('user')).id,
    full_name: new_name,
    bio: new_bio,
    location: new_location,
    website: new_url,
  }

  edit_profile(data_obj)
})
