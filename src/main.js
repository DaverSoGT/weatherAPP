const today = new Date()
const time = today.getHours()
console.log(time)

// dynamic background
const body = document.querySelector('body')
const h1 = document.querySelector('h1')
body.className = ' '

if (time > 11 && time < 19) { // test = 12 hasta 18
  body.className = 'background-afternoon'
  h1.className = 'light'
} else if (time > 5 && time < 12)  { // test = 6 hasta 11
  body.className = 'background-day'
  h1.className = 'light'

} else { // el resto
  body.className = 'background-evening'
  h1.className = 'dark'
}


const container = document.querySelector('main')

const showMessage = () => {
  container.innerHTML = `
  <h1>Muy pronto disponible</h1>
  `
}
