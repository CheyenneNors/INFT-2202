/*
Name: Cheyenne Norsworthy
Filename: index.js
Course: INFT 2202
Date: March 3, 2025
Description: This is my html animal page.
*/
import productService from "../product.service.js";

async function product(name) {
    const form = document.createElement('form');
    let description = 'Add Product';
    let product = null;
    function createContent() {
        //if(description == 'No service'){
            //return '';
        //}
        const container = document.createElement('div');
        container.classList.add('mb-2');
        //create product form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${product!=null?product.name:""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">Product Name</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Name);

        const mb3Description = document.createElement('div');
        mb3Description.classList.add('mb-3');
        editableInput = `<input type="text" class="form-control" id="description" name="description" `;
        readonlyInput = `<input type="text" class="form-control" id="description" name="description" value="${product!=null?product.description:""}" readonly>`;
        mb3Description.innerHTML = '<label for="description" class="form-label">Product Description</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Description);
        
        const mb3Stock = document.createElement('div');
        mb3Stock.classList.add('mb-3');
        editableInput = `<input type="text" class="form-control" id="stock" name="stock">`;
        readonlyInput = `<input type="text" class="form-control" id="stock" name="stock" value="${product!=null?product.stock:""}">`;
        mb3Stock.innerHTML = '<label for="stock" class="form-label">Stock Available</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Stock);
        
        const mb3Price = document.createElement('div');
        mb3Price.classList.add('mb-3');
        editableInput = `<input type="text" class="form-control" id="price" name="price">`;
        readonlyInput = `<input type="text" class="form-control" id="price" name="price" value="${product!=null?product.price:""}">`;
        mb3Price.innerHTML = '<label for="price" class="form-label">Price of Product</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Price);
        
        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = '<button type="submit" class="btn btn-primary">' +
            'Save Animal <i class="fa-solid fa-check"></i>' +
            '</button>';
        container.append(submitBtn);        
        ///
        form.append(container);
        return form;
    }
    function validate() {
        let valid = true;
        // validate form
        // test that name is valid
        const name = form.name.value;
        const eleNameError = form.name.nextElementSibling

        if (name == "") {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "You must name this product!";
            valid = false;
        } else {
            eleNameError.classList.add('d-none');
        }

        // test that product is valid
        const description = form.description.value;
        const eleDescriptionError = form.description.nextElementSibling
        if (description == "") {
            eleDescriptionError.classList.remove('d-none');
            eleDescriptionError.textContent = "What is the description of this product?";
            valid = false;
        } else {
            eleDescriptionError.classList.add('d-none');
        }

        const stock = form.stock.value;
        const eleStockError = form.stock.nextElementSibling
        if (stock == "") {
            eleStockError.classList.remove('d-none');
            eleStockError.textContent = "What is the quantity available for this product?";
            valid = false;
        } else if (isNaN(stock)) {
            eleStockError.classList.remove('d-none');
            eleStockError.textContent = "This must be a number.";
            valid = false;
        } else {
            eleStockError.classList.add('d-none');
        }

        const price = form.price.value; // check that these are numbers
        // return if the form is valid or not
        return valid
    }    
    // create a handler to deal with the submit event
    async function submit(action) {
        // validate the form
        const valid = validate();
        // do stuff if the form is valid
        if (valid) {
            console.log('were good');

            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'price' || key === 'stock') {
                    productObject[key] = Number(value);
                }
                else {
                    productObject[key] = value;
                }
            });

            const eleNameError = form.name.nextElementSibling
            try {
                if(action=="new"){
                    await productService.saveProduct([productObject]);
                } else {
                    await productService.updateProduct(productObject)
                } 
                eleNameError.classList.add('d-none');
                form.reset();
                window.location = './list.html';
            } catch (error) {
                console.log(error);
                eleNameError.classList.remove('d-none');
                eleNameError.textContent = "This product already exists!";
            }
            // do nothing if it's not
        } else {
            console.log('were not good');
        }
    }
    
    if (!name) {
        // assign a handler to the submit event
        form.addEventListener('submit', function (event) {
            // prevent the default action from happening
            event.preventDefault();
            submit("new");
        });
    }
    else{
        description = 'Update Product';
        try{
            let ret = await productService.findProduct(name);
            product = ret[0];
            form.addEventListener('submit', function (event) {
                // prevent the default action from happening
                event.preventDefault();
                submit("update");
            });
        }
        catch(err){
//show err on page
            description = err;
        }
    }

    return {
        description,
        element: createContent()
    }
}

export default product;