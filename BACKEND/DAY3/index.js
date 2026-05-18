const express = require("express");
const PORT = 5000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/home", (req, res) => {
  res.send("Home Page");
});
app.get("/html", (req, res) => {
  res.send(`<h2>Rajnikant</h2>`);
});

app.get("/users", (req, res) => {
  const users = [
    {
      id: 1,
      name: "Pratiza",
      age: 56,
    },
    {
      id: 2,
      name: "Ravi",
      age: 56,
    },
    {
      id: 3,
      name: "Aniket",
      age: 56,
    },
  ];

  res.json(users);
});
app.post("/data", (req, res) => {
  console.log("this is name coming from postman", req.body);
  res.json({
    message:"Data added successfully",
    data:req.body
  });
});


app.get("/user/:id", (req, res) => {

console.log(req.params);
res.send("Id fetched successfully");
});
app.listen(PORT, (req, res) => {
  console.log(`My server is running at port ${PORT}`);
});
