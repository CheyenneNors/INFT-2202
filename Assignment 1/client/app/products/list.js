/*
Name: Cheyenne Norsworthy
Filename: list.js
Course: INFT 2202
Date: January 17, 2025
Description: This is my js list code.
*/

import productService from "./product.service.mock.js";

function list (recordPage) 
{
    const container = document.createElement ('div');
    container.classList.add('container');
    const divWaiting = document.createElement ('div');
    divWaiting.classList.add('text-center');
    divWaiting.innerHTML = '<i class = "fa fa-5x fa-spinner fa-spin"></i>';
    container.append(divWaiting);

    const divMessage = document.createElement('div');
    divMessage.classList.add('alert', 'text-center', 'd-none');
    container.append(divMessage);


    function drawPagination({page = 1, perPage = 5, pages = 10}) 
    {
        function addPage (number, text, style) 
        {
            return `<li class="page-item ${style}">
                <a class="page-link" href="./list.html?page=${number}&perPage=${perPage}">${text}</a>
                </li>`
        }

        const pagination = document.createElement('div');
        if (pages > 1) 
        {
            pagination.classList.remove('d-none');
        }
        const ul = document.createElement("ul");
        ul.classList.add('pagination')
        ul.insertAdjacentHTML('beforeend', addPage(page - 1, 'Previous', (page == 1) ? 'disable' : ''))
        for (let i = 1; i <= pages; i++) 
        {
            ul.insertAdjacentHTML('beforeend', addPage(i, i, (i == page) ? 'active' : ''));
        }
        ul.insertAdjacentHTML('beforeend', addPage(page + 1, 'Next', (page == pages) ? 'disabled' : ''))

        pagination.append(ul);
        return pagination;
    }

    function drawProductTable(products) {
        const eleTable = document.createElement('table');
        eleTable.classList.add('table', 'table-striped');
        // Create a <thead> element
        const thead = eleTable.createTHead();
        // Create a row in the <thead>
        const row = thead.insertRow();
        // Create and append header cells
        const headers = ['Name', 'Description', 'Stock', 'Price'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            row.appendChild(th);
        });
        for (let product of products) {
            const row = eleTable.insertRow();
            // create some rows for each animal field    
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.description;
            row.insertCell().textContent = product.stock;
            row.insertCell().textContent = product.price;
            // create a cell to hold the buttons
            const eleBtnCell = row.insertCell();
            eleBtnCell.classList.add();
            // create a delete button
            const eleBtnDelete = document.createElement('button');
            eleBtnDelete.classList.add('btn', 'btn-danger', 'mx-1');
            eleBtnDelete.innerHTML = `<i class="fa fa-trash"></i>`;
            eleBtnDelete.addEventListener('click', onDeleteButtonClick(product));
            // add the delete button to the button cell
            eleBtnCell.append(eleBtnDelete);
            // create an edit button
            const eleBtnEdit = document.createElement('a');
            eleBtnEdit.classList.add('btn', 'btn-primary', 'mx-1');
            eleBtnEdit.innerHTML = `<i class="fa fa-user"></i>`;
            eleBtnEdit.href = `./product.html?name=${product.name}`
            // add the edit button to the button cell
            eleBtnCell.append(eleBtnEdit);
        }
        return eleTable;
    }
    function onDeleteButtonClick(product) {
        return event => {
            productService.deleteAnimal(product.name).then(() => { window.location.reload(); });
        }
    }
    function createContent() {
        const params = new URLSearchParams(recordPage);
        const url = new URL(`/api/products?${params.toString()}`, 'https://inft2202.opentech.durhamcollege.org');
        const req = new Request(url, {
            headers: {
                'apiKey': 'a42a0e4e-4445-42dc-a471-298627825bd4'
            },
            method: 'GET',
        });
    //do fetch here
        fetch(req)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((ret) => {
            let { records, pagination } = ret;
            divWaiting.classList.add('d-none');
            let header = document.createElement('div');
            header.classList.add('d-flex', 'justify-content-between');
            let h1 = document.createElement('h1');
            h1.innerHTML = 'Animal List';
            header.append(h1);
            header.append(drawPagination(pagination));
            container.append(header);
            container.append(drawProductTable(records));
        })
        .catch(err => {
            divWaiting.classList.add('d-none');
            divMessage.innerHTML = err;
            divMessage.classList.remove('d-none');
            divMessage.classList.add('alert-danger');
        });
        return container;
    }
    return {
        element: createContent()
    }
}

export default list;