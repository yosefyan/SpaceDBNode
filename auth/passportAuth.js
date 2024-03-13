import passport from "passport";
import Strategy from "passport-google-oauth2";
import { UserWithoutPasswordUnique } from "../models/MongoDB/Collections/Schemas/Users.js";
import {
  createInstance,
  getInstance,
} from "../models/MongoDB/Collections/dynamicService.js";
import envAdapter from "../helpers/envAdapter.js";

envAdapter();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const searchUser = await getInstance({
        collectionType: UserWithoutPasswordUnique,
        identifier: "email",
        value: profile.emails[0].value,
      });
      if (searchUser.length > 0) {
        return done(null, searchUser[0]);
      } else {
        createInstance({
          collectionType: UserWithoutPasswordUnique,
          data: {
            name: {
              first: profile.name.givenName,
              last: profile.name.familyName || "N/A",
            },
            phone: "0526714265",
            email: profile.emails[0].value,
            address: {
              country: "asd",
              city: "asd",
              street: "asd",
              houseNumber: 10,
              zip: 12345,
            },
            image: {
              url: profile.photos[0].value,
              alt: "Google picture",
            },
          },
        });
        return done(null, "done");
      }
    }
  )
);
