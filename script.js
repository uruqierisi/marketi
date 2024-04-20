document.addEventListener('DOMContentLoaded', () => {
    const Butoni = document.getElementById('Butoni');
    Butoni.addEventListener('click', fetchProduct);
});

function fetchProduct() {
    const barcode = document.getElementById('barcode').value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                updateTable(xhr.responseText);
            } else {
                console.error('Error fetching product:', xhr.status);
                alert('Error fetching product. Please try again.');
            }
        }
    };
    xhr.open('GET', 'produkti.php?barcode=' + barcode, true);
    xhr.send();
}

function updateTable(response) {
    const product = JSON.parse(response);
    if (product.error) {
        alert(product.error);
        return;
    }
    const tableBody = document.querySelector('#productInfo tbody');
    const newRow = tableBody.insertRow();
    const cellBarcode = newRow.insertCell(0);
    const cellName = newRow.insertCell(1);
    const cellQuantity = newRow.insertCell(2);
    const cellPrice = newRow.insertCell(3);
    cellBarcode.textContent = product.barcode;
    cellName.textContent = product.name;
    cellQuantity.textContent = '1'; // 
    cellPrice.textContent = product.price;
    calculateTotal(product.price);
}

function calculateTotal(price) {
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = parseFloat(totalPriceElement.textContent) || 0;
    totalPrice += parseFloat(price);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
