import uniqueNumber from "../helpers/uniqueNumber.js";
import Cards from "../models/MongoDB/Collections/Schemas/Cards.js";
import Users from "../models/MongoDB/Collections/Schemas/Users.js";
import {
  createInstance,
  getInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

const initialUsers = async () => {
  let users = [
    {
      name: {
        first: "kenny",
        last: "mc",
      },
      phone: "0500000000",
      email: "kenny@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        url: "http://www.google.com",
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: false,
      isAdmin: false,
    },
    {
      name: {
        first: "john",
        last: "wick",
      },
      phone: "0500000000",
      email: "john@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        url: "http://www.google.com",
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: true,
      isAdmin: true,
    },
    {
      name: {
        first: "james",
        last: "bond",
      },
      phone: "0500000000",
      email: "james@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        url: "http://www.google.com",
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: true,
      isAdmin: false,
    },
  ];

  try {
    for (let user of users) {
      const isUserAdded = await getInstance({
        collectionType: Users,
        identifier: "email",
        value: user.email,
      });
      isUserAdded.length === 0 &&
        (await createInstance({
          collectionType: Users,
          data: user,
        }));
    }
  } catch (err) {
    throw new Error(err);
  }
  await initialCards(users);
};

const initialCards = async (users) => {
  for (let user of users) {
    if (!user.isAdmin && user.isBusiness) {
      const isUsersAdded = await getInstance({
        collectionType: Users,
        identifier: "email",
        value: user.email,
      });
      if (isUsersAdded) {
        let cards = [
          {
            title: "card 1",
            subtitle: "sub card 1",
            description: "description card 1",
            phone: "0500000000",
            email: "card1@gmail.com",
            web: "www.bingfafsafaf.com",
            image: {
              url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
              alt: "image of something",
            },
            address: {
              state: "IL",
              country: "Israel",
              city: "Arad",
              street: "Shoham",
              houseNumber: 5,
              zip: 8920435,
            },
            bizNumber: uniqueNumber(),
            user_id: await isUsersAdded[0]._id,
          },
          {
            title: "card 2",
            subtitle: "sub card 2",
            description: "description card 2",
            phone: "0500000000",
            email: "card2@gmail.com",
            web: "www.bingfafsafaf.com",
            image: {
              url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
              alt: "image of something",
            },
            address: {
              state: "IL",
              country: "Israel",
              city: "Arad",
              street: "Shoham",
              houseNumber: 5,
              zip: 8920435,
            },
            bizNumber: uniqueNumber(),
            user_id: await isUsersAdded[0]._id,
          },
          {
            title: "a wonderful new card",
            subtitle: "a test value for this card",
            description:
              "a test value for new card\na test value for new card\n",
            phone: "012-3211234",
            email: "qwe@gmail.com",
            web: "www.bingfafsafaf.com",
            image: {
              url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
              alt: "image of something",
            },
            address: {
              state: "IL",
              country: "Israel",
              city: "Arad",
              street: "Shoham",
              houseNumber: 5,
              zip: 8920435,
            },
            bizNumber: uniqueNumber(),
            user_id: await isUsersAdded[0]._id,
          },
        ];
        try {
          for (let card of cards) {
            const isCardsAdded = await getInstance({
              collectionType: Cards,
              identifier: "email",
              value: card.email,
            });

            isCardsAdded.length === 0 &&
              (await createInstance({
                collectionType: Cards,
                data: card,
              }));
          }
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  }
};

export { initialUsers, initialCards };
