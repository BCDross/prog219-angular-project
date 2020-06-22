var express = require('express');
var router = express.Router();
var fs = require('fs');
// var writeTaskdata = "1, Test Task, This is a test task., New Task, This is where you put notes for the task.";
// var writeUserData = "1, Darren, darren, darren";

fileManager = {
  read: function () {
    let rawTaskData = fs.readFileSync("taskdata.json");
    let goodTaskData = JSON.parse(rawTaskData);
    let rawUserData = fs.readFileSync("userdata.json");
    let goodUserData = JSON.parse(rawUserData);
    console.log("Task Data: " + goodTaskData);
    console.log("User Data: " + goodUserData);
    taskArray = goodTaskData;
    userArray = goodUserData;
  },

  write: function () {
    let taskData = JSON.stringify(taskArray);
    let userData = JSON.stringify(userArray);
    fs.writeFileSync("taskdata.json", taskData);
    fs.writeFileSync("userdata.json", userData);
  }
};

taskArray = [];
userArray = [];

function Task(pTaskID, pTaskName, pDescription, pStatus, pNotes, pArchived) { //, pCreatorID, pOwnerID
  this.TaskID = pTaskID;
  this.TaskName = pTaskName;
  this.Description = pDescription;
  this.Status = pStatus;
  this.Notes = pNotes;
  this.Archived = pArchived;
  // this.CreatorID = pCreatorID;
  // this.OwnerID = pOwnerID;
}

function User(pUserId, pName, pUserName, pPassword, pDeleted) { // , pSSOActivated, pSSOAuthKey, pSSOAuthDate
  this.UserID = pUserId;
  this.Name = pName;
  this.UserName = pUserName;
  this.Password = pPassword;
  this.Deleted = pDeleted;
  // this.SSOActivated = pSSOActivated;
  // this.SSOAuthDate = pSSOAuthDate;
  // this.SSOAuthKey = pSSOAuthKey;
}

// TODO: May need to populate the file with seed data.

taskArray.push( new Task (1, 'Start TODO List', 'Set up a todo list.', 'Completed', 'Needs to be online.', true) );
taskArray.push( new Task (2, 'Call Doctor', 'Call and make a doctor appointment.', 'New Task', '', false) );
taskArray.push( new Task (3, 'Call Elements Massage', 'Set up a massage.', 'New Task', '', false) );
taskArray.push( new Task (4, 'Play Sekiro', 'Play Sekiro.', 'In Progress', '', false) );
taskArray.push( new Task (5, 'Finish God of War', 'Finish playing God of War.', 'On Hold', 'Just need to finish out the last few minutes of God of War.', false) );

userArray.push( new User (1, 'Darren', 'darren', 'darren', false) );
userArray.push( new User (2, 'Kurt', 'kurt', 'kurt', false) );
userArray.push( new User (3, 'Debi', 'debi', 'debi', false) );
userArray.push( new User (4, 'Sheldon', 'sheldon', 'sheldon', false) );
userArray.push( new User (5, 'Mark', 'mark', 'mark', false) );

fileManager.write();

// Tasks API calls

router.get("/tasks", function (req, res) {
  fileManager.read();
  taskArray.forEach(element => {
    console.log(element);  
  });
  res.status(200).json(taskArray);
});

router.get("/tasks/:id", function (req, res) {
  let found = false;
  for (var i = 0; i < taskArray.length; i++) {
    if (taskArray[i].TaskID == req.params.id) {
      console.log(taskArray[i]);
      found = true;
      res.status(200).json(taskArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send("No task with ID: " + req.params.id + " found.");
  }
});

router.put("/tasks/:id", function (req, res) {
  let found = false;
  let updatedTask = req.body;
  for (var i = 0; i < taskArray.length; i++) {
    if (taskArray[i].TaskID == updatedTask.TaskID) {
      taskArray.splice(i, 1, updatedTask);
      fileManager.write();
      console.log(taskArray[i]);
      found = true;
      res.status(200).json(taskArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send("No task with ID: " + req.params.id + " found.");
  }
});

router.delete("/tasks/:id", function (req, res) {
  for (var i =0; i < taskArray.length; i++) {
    if (taskArray[i].TaskID == req.params.id) {
      taskArray.splice(i, 1);
      found = true;
      fileManager.write();
      res.status(200).json("Deleted task ID: " + req.params.id)
    }
  }
  if (found === false) {
    res.status(500).send("No task with ID: " + req.params.id + " found.");
  }
});

router.post("/tasks", function (req, res) {
  taskArray.sort(function (a, b) {
    return a.TaskID - b.TaskID;
  });
  var newID = taskArray[taskArray.length - 1].TaskID + 1;
  var newTask = new Task(newID, req.body.TaskName, req.body.Description, req.body.Status, req.body.Notes, req.body.Archived); /*req.body.CreatorID, req.body.OwnerID, */
  taskArray.push(newTask);
  fileManager.write();
  res.status(200).json(newTask);
});

// Users API calls

// router.get("/users", function (req, res) {
//   fileManager.read();
//   userArray.forEach(element => {
//     console.log(element);  
//   });
//   res.status(200).json(userArray);
// });

// router.get("/users/:id", function (req, res) {
//   let found = false;
//   for (var i = 0; i < userArray.length; i++) {
//     if (userArray[i].id == req.params.id) {
//       console.log(userArray[i]);
//       found = true;
//       res.status(200).json(userArray[i]);
//     }
//   }
//   if (found === false) {
//     res.status(500).send("No user with ID: " + req.params.id + "found.");
//   }
// });

// router.put("/users/:id", function (req, res) {
//   let updatedUser = req.body;
//   for (var i = 0; i < userArray.length; i++) {
//     if (userArray[i].id == req.params.id) {
//       userArray[i].TaskName = updatedUser.TaskName;
//       userArray[i].Description = updatedUser.Description;
//       userArray[i].Status = updatedUser.Status;
//       userArray[i].Notes = updatedUser.Notes;
//       console.log(userArray[i]);
//       found = true;
//       res.status(200).json(userArray[i]);
//     }
//   }
//   if (found === false) {
//     res.status(500).send(err);
//   }
// });

// router.delete("/users/:id", function (req, res) {
//   for (var i =0; i < userArray.length; i++) {
//     if (userArray[i].id == req.params.id) {
//       userArray.splice(i, 1);
//       found = true;
//       fileManager.write();
//       res.status(200).json("Deleted user, ID: " + req.params.id)
//     }
//   }
//   if (found === false) {
//     res.status(500).send(err);
//   }
// });

// router.post("/users", function (req, res) {
//   userArray.sort(function (a, b) {
//     return a.id - b.id;
//   });
//   var newID = userArray[userArray.length - 1].id + 1;
//   var newUser = new User(newID, req.body.Name, req.body.UserName, req.body.CreatorID, req.body.OwnerID, req.body.Status, req.body.Notes);
//   taskArray.push(newTask);
//   fileManager.write();
//   res.status(200).json(newTask);
// });

module.exports = router;
