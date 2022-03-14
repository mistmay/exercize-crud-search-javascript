import {
    generateTable,
    inputWatcher
} from "./utility.js";

window.addEventListener('DOMContentLoaded', () => generateTable());

document.querySelector('input').addEventListener('input', () => inputWatcher());

document.getElementById('type-search').addEventListener('change', () => inputWatcher());

document.getElementById('show-order').addEventListener('change', () => inputWatcher());