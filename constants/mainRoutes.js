import dynamicUsersMethods from "../routes/api/dynamicUsersMethods.js";
import dynamicCardMethods from "../routes/api/dynamicCardMethods.js";
import dynamicAuthMethods from "../routes/api/dynamicAuthMethods.js";

const mainApiRoutes = {
  urls: ["/users", "/cards"],
  files: [dynamicUsersMethods, dynamicCardMethods],
};

const mainAuthRoutes = {
  urls: ["/"],
  files: [dynamicAuthMethods],
};

export { mainApiRoutes, mainAuthRoutes };
