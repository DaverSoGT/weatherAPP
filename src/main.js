const API_ID = 'b1b5bac9bf8f91caeb50b1fddf3777aa'
const today = new Date()
const time = today.getHours()
const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`

// dynamic background
const body = document.querySelector('body')
const h1 = document.querySelector('h1')
const button = document.querySelector('button')
body.className = ' '

const background = () => {
  if (time > 11 && time < 19) {
    body.className = 'background-afternoon'
    h1.className = 'light'
  } else if (time > 5 && time < 12)  { 
    body.className = 'background-day'
    h1.className = 'light'
  
  } else {
    body.className = 'background-evening'
    h1.className = 'dark'
  }
}

const cleanMain = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

const textCreate = (string) => {
  const text = document.createTextNode(string)
  return text
}

const container = document.querySelector('main')
const div = document.querySelector('div')
const input = document.getElementById('city-input')
const title = document.createElement('h1')
const cityName = document.createElement('h2')
const pDate = document.createElement('p')
const pTemp = document.createElement('p')
const pStatus = document.createElement('p')
const pFeelTemp = document.createElement('p')
const pWind = document.createElement('p')
const pHumidity = document.createElement('p')
const pDewPoint = document.createElement('p')
const pPressure = document.createElement('p')
const pUvi = document.createElement('p')
const pVisibility = document.createElement('p')

const sectionCard = document.createElement('section')
const sectionDescription = document.createElement('section')
const img = document.createElement('img')
const divContainer = document.createElement('div')
const divCardDescription = document.createElement('div')
const divContainerDescriptionLeft = document.createElement('div')
const divContainerDescriptionRight = document.createElement('div')
const backButton = document.createElement('input')

backButton.type = 'button'
backButton.value = 'Come back'
backButton.className = 'back-button'
backButton.addEventListener('click', function() {
  location.reload()
})

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    button.click()
  }
})

const showMessage = () => {
  getWeather()
  async function getWeather() {

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&APPID=${API_ID}`)
      const data = await res.json()

      if (data.cod !== '404') {
        const res2 = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&exclude=hourly,minutely,daily&appid=${API_ID}`)
        const data2 = await res2.json()
        cleanMain()

        cityName.className = 'city'
        cityName.appendChild(textCreate(`${data.name}, ${data.sys.country}`))
        pDate.className = 'date'
        pDate.appendChild(textCreate(`${date}`))

        sectionCard.className = 'card'
        img.className = 'icon_weather'
        img.src = '../assets/gps.svg'
        pTemp.className = 'card__temp'
        pTemp.appendChild(textCreate(`${data2.current.temp.toFixed()}°C`))

        divCardDescription.className = 'card__description'
        pFeelTemp.className = 'card__description--text'
        pFeelTemp.appendChild(textCreate(`Feels like: ${data2.current.feels_like.toFixed()}°C`))
        pStatus.className = 'card__description--text'
        pStatus.appendChild(textCreate(`${data2.current.weather[0].description}`))
        divCardDescription.append(pStatus, pFeelTemp)
        sectionCard.append(img, pTemp, divCardDescription)

        sectionDescription.className = 'container-description'
        divContainerDescriptionLeft.className = 'container-description__child left'
        pWind.className = 'description'
        pWind.appendChild(textCreate(`Wind Speed: ${data2.current.wind_speed.toFixed(1)}m/s`))
        pHumidity.className = 'description'
        pHumidity.appendChild(textCreate(`Humidity: ${data2.current.humidity}%`))
        pDewPoint.className = 'description'
        pDewPoint.appendChild(textCreate(`Dew point: ${data2.current.dew_point.toFixed()}°C`))
        divContainerDescriptionLeft.append(pWind, pHumidity, pDewPoint)
        divContainerDescriptionRight.className = 'container-description__child right'
        pPressure.className = 'description'
        pPressure.appendChild(textCreate(`Pressure: ${data2.current.pressure}hPa`))
        pUvi.className = 'description'
        pUvi.appendChild(textCreate(`UV: ${data2.current.uvi}`))
        pVisibility.className = 'description'
        pVisibility.appendChild(textCreate(`Visibility: ${(data2.current.visibility)/1000}km`))
        divContainerDescriptionRight.append(pPressure, pUvi, pVisibility)

        sectionDescription.append(divContainerDescriptionLeft, divContainerDescriptionRight)

        container.append(cityName, pDate, sectionCard, sectionDescription
        )
      } else {
        cleanMain()
        container.append(title, backButton)
        title.appendChild(textCreate('Lo sentimos, no encontramos la ciudad ingresada'))
        throw new Error('No se pudo encontrar la ciudad')
      }
    } catch (error) {
      console.error(`Se produjo el siguiente error: ${error}`)
    }
  }
}

background()