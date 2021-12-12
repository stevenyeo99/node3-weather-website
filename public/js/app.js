console.log('Client side javascript file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     console.log(response);
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {    
//             console.log('Location: ' + data.location);
//             console.log('Forecast: ' + data.forecast);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'loading';
    messageTwo.textContent = '';

    const location = search.value;

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                
                messageOne.textContent = data.error;
            } else {    
                console.log('Location: ' + data.location);
                console.log('Forecast: ' + data.forecast);

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});