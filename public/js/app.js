console.log('Client side javascript is laoded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const MessageOne = document.getElementById('message-1')
const MessageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
    MessageOne.textContent ='Loading.......';
    MessageTwo.textContent = '';
	fetch(`http://localhost:5000/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				// console.log(data.error);
                MessageOne.textContent =data.error;
                MessageTwo.textContent = '';

			} else {
				// console.log(data.location);
                MessageOne.textContent =data.location;
                MessageTwo.textContent = data.forecast;
				// console.log(data.forecast);
			}
		});
	});
});
