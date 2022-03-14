import {
    response
} from "./users.js";

const userArray = [...response.data];
let currentTable = userArray;

const noResult = {
    id: '-',
    name: 'No results',
    age: '-',
    location: {
        city: '-'
    }
};

export function generateTable(array = userArray) {
    array.forEach(element => {
        document.querySelector('tbody').append(generateRow(element));
    });
}

function generateRow(obj) {
    const row = document.createElement('tr');
    const id = document.createElement('td');
    const name = document.createElement('td');
    const age = document.createElement('td');
    const city = document.createElement('td');
    id.innerText = String(obj.id);
    name.innerText = obj.name;
    age.innerText = String(obj.age);
    city.innerText = obj.location.city;
    row.append(id);
    row.append(name);
    row.append(age);
    row.append(city);
    return row;
}

function removeAllRows() {
    document.querySelectorAll('tbody>tr').forEach(element => {
        element.remove();
    });
}

function searchById(id) {
    return userArray.find(element => String(element.id).includes(id));
}

function filterByCity(city) {
    return userArray.filter(element => element.location.city.toLowerCase().includes(city.toLowerCase()));
}

function sortByAgeCrescent(array) {
    return array.sort((a, b) => a.age - b.age);
}

function sortByAgeDecrescent(array) {
    return array.sort((a, b) => b.age - a.age);
}

function changeOrder() {
    if (currentTable.length === 0) {
        return;
    } else {
        removeAllRows();
        switch (document.getElementById('show-order').value) {
            case 'show-all-id':
                generateTable(currentTable);
                break;
            case 'show-all-age-crescent':
                generateTable(sortByAgeCrescent([...currentTable]));
                break;
            case 'show-all-age-decrescent':
                generateTable(sortByAgeDecrescent([...currentTable]));
                break;
        }
    }
}

export function inputWatcher() {
    const inputValue = document.querySelector('input').value;
    const tbody = document.querySelector('tbody');
    if (inputValue === '' || inputValue === ' ') {
        currentTable = userArray;
        changeOrder();
    } else {
        if (document.getElementById('type-search').value === 'search-by-id') {
            removeAllRows();
            const result = searchById(inputValue);
            if (result) {
                tbody.append(generateRow(result));
            } else {
                tbody.append(generateRow(noResult));
            }
            currentTable = [];
        }
        if (document.getElementById('type-search').value === 'search-by-city') {
            const result = filterByCity(inputValue);
            if (result.length === 0) {
                removeAllRows();
                tbody.append(generateRow(noResult));
                currentTable = [];
            } else {
                currentTable = result;
                changeOrder();
            }
        }
    }
}