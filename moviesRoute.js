
const express = require('express');
const router = express.Router();
const movcontrol = require('./../controllers/movieController');

// params middleware
router.param('id',movcontrol.checkID);
/* router.param('id',(req, res, next, value) =>{
    console.log("Movie ID is :" +value);  // value stores the id
    next();
})*/


router.route('/')  // app.route('/api/v1/movies') was change.
    .get(movcontrol.getAllmovies)
    .post(movcontrol.validbody, movcontrol.createMovie);
 
router.route('/:id')     // app.route('/api/v1/movies/:id')
   .get(movcontrol.getmovie)
   .patch(movcontrol.updatemovie)
   .delete(movcontrol.deletemovie)


   module.exports = router;