document.addEventListener('DOMContentLoaded', () => {
  //fill months
  const months = document.querySelector('#month')
  months.innerHTML = '<option value="" selected>Month</option>'
  const months_array = [
    'Month',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  months.addEventListener('click', () => {
    let options_month = months_array
      .map(
        (month) =>
          `<option value=${
            month.toLowerCase() != 'month' ? month.toLowerCase() : ''
          }>${month}</option>`
      )
      .join('\n')

    months.innerHTML = options_month
  })

  //fill days options
  const days = document.querySelector('#day')
  days.innerHTML = '<option value="" selected>Day</option>'
  const days_array = [
    'Day',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]

  days.addEventListener('click', () => {
    let options_day = days_array
      .map(
        (day) =>
          `<option value=${
            day.toLowerCase() != 'day' ? day.toLowerCase() : ''
          }>${day}</option>`
      )
      .join('\n')

    days.innerHTML = options_day
  })

  //fill years options
  const years = document.querySelector('#year')
  years.innerHTML = '<option value="" selected>Year</option>'
  const years_array = generateArrayOfYears()

  years.addEventListener('click', () => {
    let options_year = years_array
      .map(
        (year) => `<option value=${year != 'year' ? year : ''}>${year}</option>`
      )
      .join('\n')

    years.innerHTML = options_year
  })
})

//fill array of years from the current year back 100 years
function generateArrayOfYears() {
  const current_year = new Date().getFullYear()
  const last_previous_year = current_year - 100
  const years = ['year']

  for (let i = current_year; i >= last_previous_year; i--) {
    years.push(i)
  }
  return years
}
