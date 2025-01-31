/*
Name: Cheyenne Norsworthy
Filename: list.js
Course: INFT 2202
Date: January 17, 2025
Description: This is my js list code.
*/

console.log('we are on the list page');

const params = new URL(document.location).searchParams;

const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');

//const records = animalService.getAnimals();

let recordPage = {
    page: Number(URLSearchParams.get('Page') ?? 1),
    perPage: Number(URLSearchParams.get('perPage') ?? 7)
}
const {records, pagination} = animalService.getAnimals(recordPage);

if (!records.length) 
{
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
}else {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawAnimalTable(records);
}

function drawAnimalTable(animals) 
{
    for (let animal of animals) {
        const row =eleTable.insertRow();
        

        row.insertCell().textContent = animal.name;
        row.insertCell().textContent = animal.breed;
        row.insertCell().textContent = animal.legs;
        row.insertCell().textContent = animal.eyes;
        row.insertCell().textContent = animal.sound;

        const eleBtnCell = row.insertCell();
        eleBtnCell.classList.add(); 

        const eleBtnDelete = document.createElement('button');
        eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
        eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
        eleBtnDelete.addEventListener('click', onDeleteButtonClick(animal));
        // add the delete button to the button cell
        eleBtnCell.append(eleBtnDelete);
        // create an edit button
        const eleBtnEdit = document.createElement('a');
        eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
        eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
        eleBtnEdit.href = `./add.html?name=${animal.name}`
        // add the edit button to the button cell
        eleBtnCell.append(eleBtnEdit);
    }
}

function onDeleteButtonClick(animal) {
    return event => {
        animalService.deleteAnimal(animal);
        window.location.reload();
    }
}