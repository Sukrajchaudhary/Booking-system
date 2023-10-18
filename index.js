require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDb } = require("./db");
const passport = require("passport");
const session = require("express-session");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const authRouter = require("./routes/auth");
const LocalStrategy = require("passport-local").Strategy;
const userBooking = require("./routes/userBooking");
const bookingRouter = require("./routes/booking");
const getUserBookingRouter = require("./routes/getuserBookings");
const crypto = require("crypto");
const { User } = require("./modals/auth");
const { isAuth, sanitizer, cookieExtractor } = require("./services/common");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
// Middlewares

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;

server.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
server.use(cors());
server.use(express.json());
server.use(cookieParser());
// server.use(passport.initialize());
server.use(passport.session());

// Routes
server.use("/", authRouter.router);
server.use("/", bookingRouter.router);
server.use("/", userBooking.router);
server.use("/", getUserBookingRouter.router);

// Passport
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });

      if (!user || user.email !== email) {
        return done(null, { message: "Incorrect email" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (err) {
            return done(err);
          }
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, { message: "Invalid Credentials" });
          }

          const token = jwt.sign(sanitizer(user), secret);
          return done(null, { user: sanitizer(user), token: token });
        }
      );
    } catch (error) {
      return done(error);
    }
  })
);

// jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.id });
      if (user) {
        return done(null, sanitizer(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, sanitizer(user));
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, sanitizer(user));
  });
});

connectToDb();
server.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
