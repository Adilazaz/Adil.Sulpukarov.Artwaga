const ROOT = document.getElementById('root');
const addPers = document.getElementById('addPers');
const container = document.createElement('div');
const search = document.getElementById('search');
ROOT.append(container);
container.className = 'container';

let charactersLoaded = false;
let allCharactersData = [];

const getData = async () => {
    if (!charactersLoaded) {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        allCharactersData = data;
        displayCharacters(data);
        charactersLoaded = true;
    } else {
        container.innerHTML = '';
        charactersLoaded = false;
    }
};

const displayCharacters = (data) => {
    container.innerHTML = '';
    data.forEach(el => {
        const card = document.createElement('div');
        card.className = 'card';
        const id = document.createElement('span').textContent = `id: ${el.id} `;
        const name = document.createElement('h2').textContent = `Name: ${el.name} `;
        const email = document.createElement('h3').textContent = `email: ${el.email} `;
        const city = document.createElement('span').textContent = `city: ${el.address.city}, `;
        const street = document.createElement('span').textContent = `street: ${el.address.street}`;
        const phone = document.createElement('div').textContent = `Phone number: ${el.phone} `;
        const website = document.createElement('span').textContent = `website: ${el.website}`;
        container.append(card);
        card.append(id, document.createElement('br'), name, document.createElement('br'), email, document.createElement('br'), city, street, document.createElement('br'), phone, document.createElement('br'), website);
    });
};

const filterCharacters = () => {
    const searchText = search.value.toLowerCase();
    const filteredCharacters = allCharactersData.filter(character => {
        return (
            character.name.toLowerCase().includes(searchText) ||
            character.email.toLowerCase().includes(searchText) ||
            character.phone.toString().toLowerCase().includes(searchText)
        );
    });
    displayCharacters(filteredCharacters);
};

addPers.addEventListener('click', getData);
search.addEventListener('input', filterCharacters);