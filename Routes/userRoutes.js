const express = require("express");
const Person = require("../schemas/userSchema");

const router = express.Router();

//Create and Save a Record of a Model:

router.post("/person", async (req, res) => {
  try {
    const newPersons = await Person.create(req.body);
    res.send(newPersons);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});
// Get all collection
router.get("/person", (req, res) => {
  Person.find()
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
    });
});
//

router.get("/person/:id", (req, res) => {
    Person.findById(req.params.id )
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
      });
  });


// Get all collection with the same name
router.get("/person/name/:name", (req, res) => {
  Person.find({ name: req.params.name })
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
    });
});
// Get all collection with the favourite food
router.get("/person/food/:foodname", (req, res) => {
    Person.findOne({ favouritefoods: req.params.foodname })
    .then((person) => {
      if (!person) {
        console.log("no person found");
      } else res.send(person);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.put('/person/:id', (req, res) => {
    Person.findById(req.params.id)
      .then(person => {
        person.favouritefoods.push(...req.body.favouritefoods);
        return person.save();
      })
      .then(updatedPerson => {
        res.send(updatedPerson);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  router.put('/person/name/:name', (req, res) => {
    Person.findOneAndUpdate({ name:req.params.name }, { age: 20 }, { new: true })
      .then(updatedPerson => {
        res.send(updatedPerson);
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.delete('/person/:id',(req,res)=>{
    Person.findByIdAndRemove(req.params.id)
    .then(deletedPerson=>{res.send(`${deletedPerson.name} is deleted`)}).catch(err=>{console.error(err)})
  })
  

  router.delete('/person', (req, res) => {
    Person.deleteMany({ name: "Bob" })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
  
  });
  router.get("/person/favouritefoods/Pizza", (req, res) => {
  Person.find({ favouritefoods: "Pizza" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Server Error");
    });
});

  // Get all collection with favourite food as "burrito"

  
  
  


module.exports = router;