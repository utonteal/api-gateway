const express = require("express");
const app = express();
const PORT = 3002;

app.use(express.json());


app.post("/payment-microservice/payment", (req, res, next) => {
  res.send({ message: "Payment Successful", orderId: "or_5454644" });
});

app.get("/payment-microservice/payment2", (req, res, next) => {
  res.send({ message: "Payment UnSuccessful", orderId: "or_5454644" });
});



app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
