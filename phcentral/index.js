const express = require("express");
const app = express();
const PORT = 3001;
const jwt = require('jsonwebtoken');
const secretKey = 'PHCENTRAL';

app.use(express.json());
app.post("/phcentral/login", (req, res, next) => {
  console.log("hjh")
  const user = {
    id: 123,
    username: 'john_doe',
    role: 'admin'
  };
  const token = jwt.sign(user, secretKey, {});
  res.send({ token });
});

app.get("/phcentral/get-api", (req, res, next) => {
  res.send("Hello From get api server");
});
app.post("/phcentral/post-api", (req, res, next) => {
  res.send("Hello From post api server!" + JSON.stringify(req.body));
});
app.get("/phcentral/get-api-with-params/:id", (req, res, next) => {
  res.send("Hello From get api with params " + req.params.id);
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
