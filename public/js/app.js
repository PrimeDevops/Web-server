// console.log('Client side javascript file is loaded..')

/* fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)

    })
}) */


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ' From javascript '

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ' '

    //console.log(location)

    //fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            //console.log(data.error)

        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(forecast)


            /* console.log(data.location)
            console.log(data.forecast) */   // COMEBACK TO TEST THIS <-

        }

    })
})

})