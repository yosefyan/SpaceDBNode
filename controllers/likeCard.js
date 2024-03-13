import errorCreater from "../helpers/errorCreater.js";
import Card from "../models/MongoDB/Collections/Schemas/Cards.js";
import {
  getInstance,
  updateByIdInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

const likeCard = async (req, res) => {
  try {
    const userId = req.userData._id;
    const cardId = req.params.id;
    const neededCard = await getInstance({
      collectionType: Card,
      identifier: "_id",
      value: cardId,
    });

    const likesArray = neededCard[0].likes;
    const neededIndex = likesArray.findIndex((id) => id === cardId);

    likesArray.includes(userId)
      ? likesArray.splice(neededIndex, 1)
      : likesArray.push(userId);

    const updatedCard = await updateByIdInstance({
      collectionType: Card,
      identifier: cardId,
      data: neededCard[0],
    });
    return res.json(updatedCard);
  } catch (error) {
    errorCreater(res, 400, error.message);
  }
};

export default likeCard;
