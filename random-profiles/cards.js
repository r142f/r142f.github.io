function make_card(person) {
    let photo = document.createElement('img');
    photo.classList.add('photo', 'loading');
    photo.addEventListener('load', event => { photo.classList.remove('loading') });
    photo.setAttribute('src', person.picture.large);

    let firstname_header = document.createElement('h3');
    firstname_header.textContent = "Firstname";

    let firstname = document.createElement('div');
    firstname.classList.add('firstname');

    let lastname_header = document.createElement('h3');
    lastname_header.textContent = "Lastname";

    let lastname = document.createElement('div');
    lastname.classList.add('lastname');

    let email_header = document.createElement('h3');
    email_header.textContent = "Email";

    let email = document.createElement('div');
    email.classList.add('email');

    let location_header = document.createElement('h3');
    location_header.textContent = "City";

    let location = document.createElement('div');
    location.classList.add('location');

    ({  name: {first: firstname.textContent, last: lastname.textContent},
        email: email.textContent,
        location: {city: location.textContent}
    } = person);

    let map = document.createElement('iframe');
    map.classList.add('map');

    let map_cont = document.createElement('div');
    map_cont.classList.add('map-container', 'loading');
    map_cont.appendChild(map);

    let city = person.location.city.replace(/ /g, '+');

    map.setAttribute('src',
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyBO02O2ZMBjuQxAKgQ7pDjCPLbNOVDmZQw&q=${city}`);

    map.addEventListener('load', event => {
        map_cont.classList.toggle('loading')
    });

    let new_card = document.createElement('div');
    new_card.classList.add('card');

    new_card.append(photo, firstname_header, firstname, lastname_header, lastname,
        email_header, email, location_header, location, map_cont);

    return new_card;
}

new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results=10&inc=email,name,picture,location', true);
    
    document.addEventListener("DOMContentLoaded", () => {
        xhr.onload = () => {
            if (xhr.status != 200) reject(new Error(xhr.statusText));
            else resolve(JSON.parse(xhr.responseText).results);
        }

        xhr.send();
    });

}).then(people => {
    let cards_container = document.getElementsByClassName("cards-container")[0];
    document.getElementById("preloader").remove();

    for (let person of people) cards_container.appendChild(make_card(person));
    
}).catch(error => {
    alert("Error occurred! Please refresh the page.");
});