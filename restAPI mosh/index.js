const express = require('express');
const app = express();
const Joi = require('joi');
// import { ValidateSome } from './tools/helpers';

app.use(express.json());



const something = [
    {id:1, name: 'Pejo'},
    {id:2, name: 'Penda'},
    {id:3, name: 'Panda'}
];


app.get('/', (req, res) => {
   res.send('Hi there'); 
})


app.get('/api', (req, res) => {
    res.send(something);
}); 






app.post('/api', (req, res) => {

const { error} = ValidateSome(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const some = {
        id: something.length + 1,
        name: req.body.name
    };
    something.push(some);
    res.send(some);
});




app.put('/api/:id', (req,res) => {
    // Lookup , if not reutun 404
    const some = something.find(c => c.id === parseInt(req.params.id));
    if (!some) return res.status(404).send('This something is not found');
 
         

    //Validate, if not return 400
    const { error} = ValidateSome(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    //Update course , retrun the updated something
    some.name = req.body.name;
    res.send(some);
})





app.get('/api/:id', (req, res) => {
    const some = something.find(c => c.id === parseInt(req.params.id));
    if (!some) return res.status(404).send('This something is not found');
    res.send(some);
})


function ValidateSome(some) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(some, schema);
}



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on ${port}...`))




app.delete('/api/:id', (req, res) => {
   // Look up the course , if not exiting 404
   const some = something.find(c => c.id === parseInt(req.params.id));
   if (!some) return res.status(404).send('This something is not found');


   //delete it and return it
   const index = something.indexOf(some);
   something.splice(index, 1);

   res.send(some);

})