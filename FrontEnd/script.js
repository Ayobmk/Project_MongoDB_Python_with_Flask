
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
                    <li class="list-group-item">
                        Name: ${item.name} | Genre: ${item.genre} | Description: ${item.description} | Price: ${item.price}
                    </li>`;
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
        document.getElementById('output').innerHTML = `<li class="list-group-item">Name : ${data.name} Genre : ${data.genre} Description : ${data.description} Price : ${data.price}</li>`
    })
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
    .then((data) => console.log(data))
}