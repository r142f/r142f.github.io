let cards = document.getElementsByClassName("card");
let firstname_inp = document.getElementById('firstname-input');
let lastname_inp = document.getElementById('lastname-input');
let email_inp = document.getElementById('email-input');
let location_inp = document.getElementById('location-input');

document.querySelector("button:last-of-type").addEventListener('click', event => {
    let filter_values = {
        firstname: firstname_inp.value,
        lastname: lastname_inp.value,
        email: email_inp.value,
        location: location_inp.value
    };

    for (let card of cards) {
        let reg = '';
        let rightness = true;

        for (let key in filter_values) {
            if (filter_values[key] !== '' && rightness) {
                reg = new RegExp(filter_values[key], 'i');
                rightness = card.getElementsByClassName(key)[0].textContent.match(reg) ? true : false;
            }
        }

        card.style.display = rightness ? '' : 'none';
    }
});

document.querySelectorAll('input').forEach(input => input.addEventListener("keypress", event => {
    if (event.keyCode === 13)
        document.querySelector("button:last-of-type").dispatchEvent(new Event("click"));
}));

document.querySelector("button:first-of-type").addEventListener('click', event => {
    firstname_inp.value = '';
    lastname_inp.value = '';
    email_inp.value = '';
    location_inp.value = '';

    for (let card of cards) card.style.display = '';
});