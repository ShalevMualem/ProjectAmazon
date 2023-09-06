
import express from "express";
import expressAsyncHandler from "express-async-handler";

import Order from "../Models/OrderModel.js";
import { isAuth } from '../utils.js'

export const orderRouter = express.Router();

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
          return res.send(order);
        } 
          
        res.sendStatus(404);
    
  })
);

orderRouter.post(
    "/",
    isAuth,
    expressAsyncHandler(async (req, res, next) => {
        try{
          console.log(req.body);
            const newOrder = new Order({
            orderItems:req.body.orderItems.map((item)=>({
                 ...item,//todo : this may be problem
                product:item._id,
            })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user:req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({message:"new order created", order});
    }catch(err){
      res.sendStatus(500);
      console.log(err);
    }
    })
  );