// Get the item name from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const itemIdentifier  = urlParams.get('name');

// Fetch the item details and pre-fill the form
window.onload = function() {
    fetch(`http://localhost:5000/${itemIdentifier}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            // document.getElementById('itemHeader').innerText = `Update Item: ${data.name || data.data}`;
            
            document.getElementById('updateName').value = data.data;
            document.getElementById('updateGenre').value = data.genre;
            document.getElementById('updateDescription').value = data.description;
            document.getElementById('updatePrice').value = data.price;
        })
        .catch((error) => {
            console.error('Error fetching item details:', error);
        });
};

// Submit the updated data
document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const updatedData = {
        name: document.getElementById('updateName').value,
        genre: document.getElementById('updateGenre').value,
        description: document.getElementById('updateDescription').value,
        price: parseFloat(document.getElementById('updatePrice').value)
    };

    fetch(`http://localhost:5000/updateData/${itemIdentifier}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(updatedData)
    })
    .then(() => {
        console.log('Item updated successfully');
        window.location.href = 'index.html'; // Redirect back to the main page
    })
    .catch((error) => {
        console.error('Error updating item:', error);
    });
});
