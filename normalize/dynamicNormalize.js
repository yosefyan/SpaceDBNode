import { defaultCard, defaultUser } from "../constants/alternativePhotos.js";
import uniqueNumber from "../helpers/uniqueNumber.js";

const dynamicNormalize = (collectionType, data) => {
  try {
    return {
      ...data,
      ...(collectionType.modelName === "users" && {
        name: { ...data.name, middle: data.name.middle || "" },
      }),
      image: {
        url:
          data.image.url || collectionType.modelName === "cards"
            ? defaultCard
            : defaultUser,
        alt:
          data.image.alt || collectionType.modelName === "cards"
            ? "Business cards"
            : "Avatar",
      },
      address: {
        ...data.address,
        state: data.address.state || undefined,
        zip: data.address.zip || undefined,
      },
      ...(collectionType.modelName === "cards" && {
        web: data.web || undefined,
      }),
      ...(collectionType.modelName === "cards" && {
        bizNumber: data.bizNumber || uniqueNumber(),
      }),
    };
  } catch (error) {
    return new Error(error);
  }
};

export default dynamicNormalize;
