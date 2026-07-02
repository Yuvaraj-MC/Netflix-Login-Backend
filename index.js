const express = require("express"); //from express library
const cors = require("cors"); // from cors library
const app = express(); //create object for reference for express library in future we can use app reference

//Adding middleware
app.use(cors()); // cors->from frontend(5173) to backend(5000) its allow the request
app.use(express.json()); //express.json() reads the JSON data sent by Axios and stores it in req.body. Without it, req.body will be undefined. and We use express.json() because Axios sends data in JSON format
// this two middlewares request will work before hitting the server
// creating mock users because we dont have the database

const port = process.env.PORT || 5000;

const users = [
  { email: "raju@gmail.com", password: "raju123" },
  { email: "yuvi@gmail.com", password: "yuvi123" },
];

app.post("/login", function (req, res) {
  console.log("Email:", req.body.email);
  console.log("Password:", req.body.password);

  const user = users.find(function (u) {
    return u.email === req.body.email;
  });

  setTimeout(function () {
    // email though wrong
    if (!user) {
      res.json({ success: false, message: "Email not found" });
    } else if (user.password !== req.body.password) {
      // email correct and password wrong
      res.json({ success: false, message: "Incorrect password" });
    } else {
      //   Both correct
      res.json({
        success: true,
        message: "Login Successful! Welcome to Netflix",
      });
    }
  }, 2000);
});


app.post("/signup", function (req, res) {
  console.log("Signup Email:", req.body.email);
  console.log("Signup Password:", req.body.password);

  // user is already their with this email or not
  const existingUser = users.find(function (u) {
    return u.email === req.body.email;
  });

  setTimeout(function () {
    if (existingUser) {
      // already register or not
      res.json({ success: false, message: "User already exists. Please sign in." });
    } else {
      // new user add in array
      users.push({ email: req.body.email, password: req.body.password });
      res.json({ success: true, message: "Sign Up successful! Now you can sign in." });
    }
  }, 2000);
});




app.listen(port, function () {
  console.log("Backend server started on port " + port);
});