import express from "express";
import midtransClient from "midtrans-client";
import "dotenv/config";

const router = express.Router();

router.post("/process-transaction", (req, res) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    let { order_id, price, quantity, item_name, customer_name } = req.body;

    price = parseInt(price);
    quantity = parseInt(quantity);

    let total = price * quantity;

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: total,
      },
      item_details: {
        name: item_name,
        price,
        quantity,
      },
      customer_details: {
        first_name: customer_name,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      const data = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;

      res.status(200).json({ message: "berhasil", data, token });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
