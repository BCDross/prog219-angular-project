var express = require('express');
var router = express.Router();
var fs = require('fs');
var writeTaskdata = "1, Test Task, This is a test task., 1, 1, New Task, This is where you put notes for the task.";
var writeUserData = "1, Darren, darren, darren, false, , ";

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

function Task(pTaskID, pTaskName, pDescription, pCreatorID, pOwnerID, pStatus, pNotes) {
  this.ID = pTaskID;
  this.TaskName = pTaskName;
  this.Description = pDescription;
  this.CreatorID = pCreatorID;
  this.OwnerID = pOwnerID;
  this.Status = pStatus;
  this.Notes = pNotes;
}

function User(pId, pName, pUserName, pPassword, pSSOActivated, pSSOAuthKey, pSSOAuthDate) {
  this.ID = pId;
  this.Name = pName;
  this.UserName = pUserName;
  this.Password = pPassword;
  this.SSOActivated = pSSOActivated;
  this.SSOAuthDate = pSSOAuthDate;
  this.SSOAuthKey = pSSOAuthKey;
}

// TODO: May need to populate the file with seed data.

taskArray.push( new Task (1, 'Test Task', 'This is a test task.', 1, 1, 'New Task', 'This is where you put notes for the task.') );
userArray.push( new User (1, 'Darren', 'darren', 'darren', false, '', '') );
fileManager.write();

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// Tasks API calls

router.get("/tasks", function (req, res) {
  fileManager.read();
  console.log(taskArray);
  res.status(200).json(taskArray);
});

router.get("/tasks/:id", function (req, res) {
  let found = false;
  for (var i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == req.params.id) {
      console.log(taskArray[i]);
      found = true;
      res.status(200).json(taskArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send("No task with ID: " + req.params.id + "found.");
  }
});

router.put("/tasks/:id", function (req, res) {
  let updatedTask = req.body;
  for (var i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == req.params.id) {
      taskArray[i].TaskName = req.params.TaskName;
      taskArray[i].Description = req.params.Description;
      taskArray[i].CreatorID = req.params.CreatorID;
      taskArray[i].OwnerID = req.params.OwnerID;
      taskArray[i].Status = req.params.Status;
      taskArray[i].Notes = req.params.Notes;
      console.log(taskArray[i]);
      found = true;
      res.status(200).json(taskArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send(err);
  }
});

router.delete("/tasks/:id", function (req, res) {
  for (var i =0; i < taskArray.length; i++) {
    if (taskArray[i].id == req.params.id) {
      taskArray.splice(i, 1);
      found = true;
      fileManager.write();
      res.status(200).json("Deleted task ID: " + req.params.id)
    }
  }
  if (found === false) {
    res.status(500).send(err);
  }
});

router.post("/tasks", function (req, res) {
  taskArray.sort(function (a, b) {
    return a.id - b.id;
  });
  var newID = taskArray[taskArray.length - 1].id + 1;
  var newTask = new Task(newID, req.body.TaskName, req.body.Description, req.body.CreatorID, req.body.OwnerID, req.body.Status, req.body.Notes);
  taskArray.push(newTask);
  fileManager.write();
  res.status(200).json(newTask);
});

// Tasks API calls

router.get("/users", function (req, res) {
  fileManager.read();
  console.log(userArray);
  res.status(200).json(userArray);
});

router.get("/users/:id", function (req, res) {
  let found = false;
  for (var i = 0; i < userArray.length; i++) {
    if (userArray[i].id == req.params.id) {
      console.log(userArray[i]);
      found = true;
      res.status(200).json(userArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send("No user with ID: " + req.params.id + "found.");
  }
});

router.put("/users/:id", function (req, res) {
  let updatedUser = req.body;
  for (var i = 0; i < userArray.length; i++) {
    if (userArray[i].id == req.params.id) {
      userArray[i].TaskName = updatedUser.TaskName;
      userArray[i].Description = updatedUser.Description;
      userArray[i].CreatorID = updatedUser.CreatorID;
      userArray[i].OwnerID = updatedUser.OwnerID;
      userArray[i].Status = updatedUser.Status;
      userArray[i].Notes = updatedUser.Notes;
      console.log(userArray[i]);
      found = true;
      res.status(200).json(userArray[i]);
    }
  }
  if (found === false) {
    res.status(500).send(err);
  }
});

router.delete("/users/:id", function (req, res) {
  for (var i =0; i < userArray.length; i++) {
    if (userArray[i].id == req.params.id) {
      userArray.splice(i, 1);
      found = true;
      fileManager.write();
      res.status(200).json("Deleted user, ID: " + req.params.id)
    }
  }
  if (found === false) {
    res.status(500).send(err);
  }
});

router.post("/users", function (req, res) {
  userArray.sort(function (a, b) {
    return a.id - b.id;
  });
  var newID = userArray[userArray.length - 1].id + 1;
  var newUser = new User(newID, req.body.Name, req.body.UserName, req.body.CreatorID, req.body.OwnerID, req.body.Status, req.body.Notes);
  taskArray.push(newTask);
  fileManager.write();
  res.status(200).json(newTask);
});

module.exports = router;
