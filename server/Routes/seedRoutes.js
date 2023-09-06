import express from "express";

import Product from "../Models/ProductModel.js";
import User from "../Models/UserModel.js";
import Order from "../Models/OrderModel.js";

import data from "../data.js";

 const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
    try {
        await Product.deleteMany({});
        await Order.deleteMany({});
        await User.deleteMany({});

        const createdProducts = await Product.insertMany(data.products);
        const createdUsers = await User.insertMany(data.users);
        res.send({createdProducts, createdUsers});
}catch (e) {
    console.log("failed to update "+ e.message);
}
});

export default seedRouter;

