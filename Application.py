from flask import Flask, jsonify, request, redirect
from flask.helpers import url_for
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/catalogue'
app.config['CORS_HEADERS'] = 'Content-Type'
mongo = PyMongo(app)

# Function to retrieve all the data from the database
@app.route('/', methods = ['GET'])
def retrieveAll():
    holder = list()
    current_catalogue = mongo.db.catalogue
    for i in current_catalogue.find():
        holder.append({
            'name': i['name'], 
            'genre' : i['genre'], 
            'description': i['description'], 
            'price' : i['price']
        })
    return jsonify(holder)

# Function to retrieve data from the database based on the name
@app.route('/<name>', methods = ['GET'])
@cross_origin()
def retrieveFromName(name):
    current_catalogue = mongo.db.catalogue
    data = current_catalogue.find_one({'name': name})
    return jsonify({
        'data': data['name'], 
        'genre': data['genre'], 
        'description': data['description'], 
        'price': data['price']
    })

# Function to add data to the database
@app.route('/postData', methods = ['POST'])
def postData():
    current_catalogue = mongo.db.catalogue
    name = request.json['name']
    genre = request.json['genre']
    description = request.json['description']
    price = request.json['price']
    current_catalogue.insert_one({
        'name': name, 
        'genre': genre, 
        'description': description, 
        'price': price
    })
    return jsonify({
        'name': name,
        'genre': genre,
        'description': description,
        'price': price
    })
    
# Function to delete data from the database
@app.route('/deleteData/<name>', methods = ['DELETE'])
def deleteData(name):
    current_catalogue = mongo.db.catalogue
    current_catalogue.delete_one({'name': name})
    return redirect(url_for('retrieveAll'))

# Function to update data in the database
@app.route('/updateData/<name>', methods = ['PUT'])
def updateData(name):
    current_catalogue = mongo.db.catalogue
    updatedName = request.json['name']
    current_catalogue.update_one({'name': name}, {"$set": {'name': updatedName}})
    return redirect(url_for('retrieveAll'))

if __name__ == '__main__':
    app.run(debug=True)