
document.getElementById('formData').addEventListener('submit', retrieveName); 

// function to retrieve all items when the page loads
window.onload = function() {
    fetch('http://localhost:5000/')
        .then((response) => response.json())
        .then((data) => {
            const allItemsOutput = document.getElementById('allItemsOutput');
            allItemsOutput.innerHTML = ''; // Clear any existing content
            data.forEach(item => {
                allItemsOutput.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">
                                    <strong>Genre:</strong> ${item.genre} <br>
                                    <strong>Description:</strong> ${item.description} <br>
                                    <strong>Price:</strong> ${item.price}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary" onclick="updateItem('${item.name}')">Update</button>
                                    <button class="btn btn-danger" onclick="deleteItem('${item.name}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
        })
        .catch((error) => {
            console.error('Error fetching items:', error);
        });
};
// function to retrieve data from the database
function retrieveName(e) {
    e.preventDefault();
    
    let name = document.getElementById('name').value;

    fetch(`http://Localhost:5000/${name}`)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById('output').innerHTML = '';

        // Create a card for the retrieved item
        const cardHTML = `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${data.data}</h5>
                        <p class="card-text">
                            <strong>Genre:</strong> ${data.genre} <br>
                            <strong>Description:</strong> ${data.description} <br>
                            <strong>Price:</strong> ${data.price}
                        </p>
                        <button class="btn btn-primary" onclick="updateItem('${data.data}')">Update</button>
                        <button class="btn btn-danger" onclick="deleteItem('${data.data}')">Delete</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('output').innerHTML += cardHTML; // Append the card HTML
    })
    .catch((error) => {
        console.error('Error fetching item:', error);
    });
}


// function to add data to the database
document.getElementById('AddData').addEventListener('submit', AddData);

function AddData(e) {
    e.preventDefault();

    let name = document.getElementById('addName').value;
    let genre = document.getElementById('addGenre').value;
    let description = document.getElementById('addDescription').value;
    let price = parseFloat(document.getElementById('addPrice').value);

    fetch('http://Localhost:5000/postData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name, 
            genre: genre, 
            description: description, 
            price: price
        })
    })
    .then((Response) => Response.json())
    .then((data) => {
        console.log(data);
        // Reload the page only after the record has been added
        window.location.reload();
    })
    .catch((error) => {
        console.error('Error adding data:', error);
    });
}


// Function to delete item
function deleteItem(name) {
    fetch(`http://localhost:5000/deleteData/${name}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log(`Deleted item: ${name}`);
        window.location.reload(); // Reload to reflect changes
    })
    .catch((error) => {
        console.error('Error deleting item:', error);
    });
}

// Function to update item
function updateItem(name) {
    const updatedName = prompt("Enter the new name:", name);
    if (updatedName && updatedName !== name) {
        fetch(`http://localhost:5000/updateData/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: updatedName })
        })
        .then(() => {
            console.log(`Updated item: ${name} to ${updatedName}`);
            window.location.reload(); // Reload to reflect changes
        })
        .catch((error) => {
            console.error('Error updating item:', error);
        });
    }
}
