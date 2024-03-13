import express from "express";
import { cardsRouteData } from "../../constants/routeData.js";
const router = express.Router();

Object.entries(cardsRouteData).map(([key, value]) => {
  return value.urls.map((val, i) => {
    return router[key](val, value.bodyRequest[i]);
  });
});

export default router;
