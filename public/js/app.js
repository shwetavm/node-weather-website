console.log("Client side javascript file is loaded")

// fetch('http://puzzel.mead.io/puzzel').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherData=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

messageOne.textContent = 'JavaScript'

weatherData.addEventListener('submit',(e) => {
    e.preventDefault()

   messageOne.textContent="Fetching the data"

    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
           // console.log(data.error)
        }
        else {
            messageOne.textContent=data.forecast.description
            messageTwo.textContent=data.place_name
            //console.log(data.forecast.description)
            //console.log(data.place_name)
        }
    })
})

    // console.log('testing')
    // console.log(search.value)
})