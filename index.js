let authorEl = document.getElementById("authorEl")
let quoteEl = document.getElementById("quoteEl")
let clockEl = document.getElementById("clockEl")

let weatherEl = document.getElementById("weatherEl")
let tempEl = document.getElementById("tempEl")
let imgEl = document.getElementById("imgEl")


let cryptoEl = document.getElementById("cryptoEl")
let dailyCurrent = document.getElementById("daily-current")
let dailyHigh = document.getElementById("daily-high")
let dailyLow = document.getElementById("daily-low")

function genTime(){
    const timeOfDay = new Date()
    clockEl.innerHTML = timeOfDay.toLocaleTimeString("en-us",{timeStyle: "short"})
}
//Runs the function every second to display live time
setInterval(genTime, 1000)


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=universe")
    .then (res => res.json())
    .then (data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        authorEl.textContent = `Photo: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1477927849362-0fb1e7d59ee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTkzODY4ODU&ixlib=rb-1.2.1&q=80&w=1080)`
    })

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cryptoEl.innerHTML = `
            <img src=${data.image.small}> 
            <span>${data.name}</span>
        `
        dailyCurrent.innerHTML = `
            👉: £${data.market_data.current_price.gbp}
        `
        dailyHigh.innerHTML = `
            👆 : £${data.market_data.high_24h.gbp}
        `
        dailyLow.innerHTML = `
            👇 : £${data.market_data.low_24h.gbp}
        `
    })
    .catch(err => {
        console.error(err)
    })

// The users weather based on location calculated by longitude and latitude.
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c61861dadad6ee1e7034eb95d2763b1a&units=metric`)
        .then(res => {
            if (!res.ok){
                throw Error ("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            weatherEl.textContent = `${data.name}`
            tempEl.textContent = `${Math.round(data.main.temp)}°C`
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            imgEl.innerHTML = `<img src="${iconUrl}">`
        })
        .catch(err => console.error(err))
});
