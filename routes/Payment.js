const express = require("express");
const {
    createPaymentIntent,
    confirmPayment,
    recordDeduction,
    getUserPayments,
    getAllPayments,
} = require("../controllers/Payment");

const router = express.Router();

router.post("/create-intent", createPaymentIntent);  // Stripe intent
router.post("/confirm", confirmPayment);              // Confirm & wallet update
router.post("/deduct", recordDeduction);              // Ride deduction
router.get("/user/:userId", getUserPayments);         // User history
router.get("/all", getAllPayments);                   // Admin

module.exports = router;