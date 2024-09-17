import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [item_name, setItem_name] = useState("");
  const [order_id, setOrder_id] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [token, setToken] = useState();

  const process = async () => {
    const data = {
      customer_name: name,
      item_name,
      order_id,
      price,
      quantity,
    };

    const response = await axios.post(
      "http://localhost:3000/api/payment/process-transaction",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.error) {
      setToken(response.data.token);
    }
  };

  useEffect(() => {
    if (token) {
      // ini bawaan dari midtrans, dan digunakan untuk memunculkan pop up
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          setToken("");
        },
        onPending: (result) => {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });

      setName("");
      setItem_name("");
      setOrder_id("");
      setPrice("");
      setQuantity("");
    }
  }, [token]);

  useEffect(() => {
    // memberikan ini wajib
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-kndcMdzMLUa_L1tL";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        p: 4,
        gap: 5,
      }}
    >
      <TextField
        sx={{ width: "90%" }}
        type="text"
        label="nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        sx={{ width: "90%" }}
        type="text"
        label="item name"
        value={item_name}
        onChange={(e) => setItem_name(e.target.value)}
      />
      <TextField
        sx={{ width: "90%" }}
        type="text"
        label="Order ID"
        value={order_id}
        onChange={(e) => setOrder_id(e.target.value)}
      />
      <TextField
        sx={{ width: "90%" }}
        type="number"
        label="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        sx={{ width: "90%" }}
        type="number"
        label="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <Box>
        <Button variant="outlined" onClick={process}>
          Process
        </Button>
      </Box>
    </Box>
  );
}
