/*
Name: Cheyenne Norsworthy
Filename: create.js
Course: INFT 2202
Date: January 10, 2025
Description: This is my general js create page.
*/
/*
 *  Service constructor
 */
function productService() {

    // if there is no entry for animals in local storage
    if (!localStorage.getItem('products')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
        // create a new entry in local storage and put an empty array in it        
        localStorage.setItem('products', JSON.stringify([]))
    }
}
/*
 *
 */
productService.prototype.getProducts = function () {
    // this will always be set, because we did it in the constructor
    return JSON.parse(localStorage.getItem('products'));
}
productService.prototype.getProductPage = function ({ page = 1, perPage = 15 }) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            // this will always be set, because we did it in the constructor
            let records = JSON.parse(localStorage.getItem('products'));
            let pagination = {
                page: page,
                perPage: perPage,
                pages: Math.ceil(records.length / perPage)
            }
            //for test purpose
            //if (pagination.page == pagination.pages) {
            //    reject("No Serivce");
            //}
            let start = (pagination.page - 1) * perPage;
            let end = start + perPage;
            resolve({
                records: records.slice(start, end),
                pagination
            });
        }, 500);
    });
}
/*
 *
 */
productService.prototype.saveProduct = function (product) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function () {
            products.forEach(product => {
                // get a list of animals
                const _products = self.getProducts();
                // see if this animal already exists
                if (_products.find(a => a.name == product.name)) {
                    // tell the caller we're not going to save this
                    reject('An product with that name already exists!');
                }
                // if it doesn't, add it to the array
                _products.push(product);
                // and save it in storage again
                localStorage.setItem('products', JSON.stringify(_products));
            });
            // tell the caller all was well
            resolve(true);
        }, 250);
    });
}
/*
 *
 */
productService.prototype.findProducts = function (productName) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (productName == '') {
                reject('No service');
            }
            else {
                const products = self.getProducts();
                const product = products.find(a => a.name == productName);
                if (!product) {
                    resolve([]);
                }
                resolve([product]);
            }
        }, 250);
    });
}
/*
 *
 */
productService.prototype.updateProduct = function (product) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (product.name == '') {
                reject('No service');
            }
            else {
                const products = self.getProducts();
                const idx = products.findIndex(a => a.name == product.name);
                if (idx === -1) {
                    resolve(false);
                }
                products[idx] = product;
                localStorage.setItem('product', JSON.stringify(products));
                resolve(true);

            }
        }, 250);
    });
}
/*
 *
 */
productService.prototype.deleteProduct = function (name) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function () {
            if (name == 'name 0') {
                reject('No service');
            }
            else {
                const products = self.getProducts();
                const idx = products.findIndex(a => a.name == name);
                if (idx === -1) {
                    resolve(false);
                }
                products.splice(idx, 1);
                localStorage.setItem('products', JSON.stringify(products));
                resolve(true);
            }
        }, 250);
    });
}

export default new productService();