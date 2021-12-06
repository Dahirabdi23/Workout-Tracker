const router = require('express').Router();
const Workout = require('../models/workout');

// create a new workout
router.post("/", ({ body }, res) => {
  Workout.create(body)
      .then(workout => {
          res.json(workout);
          console.log('new workout', workout);
      })
      .catch((err) => {
          res.json(err);
      });
});

// get workout summary
router.get("/", (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: {
                  $sum: '$exercises.duration'
              },
          },
      },
  ])
      .then((workout) => {
          console.log('workout summary', workout)
          res.json(workout)
      })
      .catch((err) => {
          res.json(err)
      })
});

// add new exercise
router.put("/:id", (req, res) => {
  console.log('PARAMS', req.params)
  Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true, runValidators: true }
  )
      .then((workout) => {
        res.json(workout)
      })
      .catch((err) => {
          res.json(err)
      })
});

// display stats
router.get(`/range`, (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration:
                  { $sum: '$exercises.duration' },
              totalWeight:
                  { $sum: '$exercises.weight' }
          }
      }
  ])
      .limit(10)
      .then((workout) => {
          console.log('display stats', workout)
          res.json(workout)
      })
      .catch((e) => {
          res.json(e);
      })
});

module.exports = router;