// backend/index.js

const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://nicolerishwain:1234@cluster0.64bjqij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to yourDB-name database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

// Schema for users of the app
const HikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    elevation: {
        type: Number,
        // required: true,
    },
    length: {
        type: Number,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    completed: {
        type: String
        // required: true,
    },
    
    
});

const Hike = mongoose.model('hikes', HikeSchema);

// Express setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // React frontend URL
}));

app.get("/calc", async (req, res) => {
    try {
        const allHikes = await Hike.find({});
            const response = await fetch('http://localhost:5004/', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: allHikes
                })
            });
            calc = await response.json();
        
        res.json(calc)
        
    } catch (error) {
        console.error('Error in /hikes route:', error.message);
        res.status(500).send('Server error');
    }
});

app.get("/hikes", async (req, res) => {
    try {
        
        var {difficulty, completed, search} = req.query
        const allHikes = await Hike.find({});
        let filteredHikes = allHikes
        difficulty = difficulty === 'All' ? undefined : difficulty
        completed = completed === 'All' ? undefined : completed
        console.log(search === '')
        search = search === '' ? undefined : search


        if (difficulty !== undefined || completed !== undefined) {
            const response = await fetch('http://localhost:5002/filter', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    difficulty: difficulty,
                    completed: completed,
                data: allHikes
                })
            });
            filteredHikes = await response.json();
        } 
        if (search !== undefined) {

            console.log("text")
            const response = await fetch('http://localhost:5003/search', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    search: search,
                    data: filteredHikes
                })
            });
            filteredHikes = await response.json();
        }
        res.json(filteredHikes)
        
    } catch (error) {
        console.error('Error in /hikes route:', error.message);
        res.status(500).send('Server error');
    }
});


app.get('/hikes/:id', async (req, res) => {
    try {
        const hike = await Hike.findById(req.params.id);
        if (!hike) return res.status(404).send('Hike not found');
        res.json(hike);
    } catch (error) {
        console.error('Server error:', error); // Add this line
        res.status(500).send('Server error');
    
    }
});
/**
 * for all api calls
 *   validate authentication to get user identifier
 *   get request headers/http method/body/user id in header
 *   call backend service with the info above
 * backend service returns the data that you passed it
 * auth service returns whatever backend service returned
 */


app.put('/hikes/:id', async (req, res) => {
    try {
        const hike = await Hike.findById(req.params.id);
        if (!hike) return res.status(404).send('Item not found');
       
        hike.name = req.body.name;  // Update the item's name
        hike.difficulty = req.body.difficulty;
        hike.elevation = req.body.elevation;
        hike.length = req.body.length;
        hike.location = req.body.location;
        hike.completed = req.body.completed;
        
        const updatedHike = await hike.save();
        res.json(updatedHike);


    } catch (error) {
        console.error('Server error:', error); // Add this line
        res.status(500).send('Server error');
    }
    

    
});

// API to add a hike
app.post("/add", async (req, res) => {
    try {
        const hike = new Hike(req.body);
        let result = await hike.save();
        res.status(201).send(result); // Send successful response
        
    } catch (e) {
        console.error('Error adding hike', e)
        res.status(500).send({ message: "Something went wrong", error: e.message });
    }
});
app.delete('/hikes/:id', async(req, res) => {
    try {
        const deletedHike = await Hike.findByIdAndDelete(req.params.id);
        if (!deletedHike) {
            return res.status(404).send('Hike not found');
        }
        res.json(deletedHike);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(5001, () => {
    console.log("App is running on port 5001");
});
