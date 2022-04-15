import express from "express";

const app = express();
const port = 3000; //add your port here
const SECRET_KEY =
  "sk_test_51KohzCSGXTS5PtLww4DaWR9J2FHwK5VdiTkAJoRi3NG7wJxjsjzRMPPYyFAIxv8qW9zZzdhCF4Bq8YWFoj1Jun0400u0cwGeNb";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.send({ error: e.message });
  }
});
