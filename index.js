require("dotenv").config();
const express = require("express");
const server = express();
const { connectToDb } = require("./db");
const passport = require("passport");
const session = require("express-session");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const authRouter = require("./routes/auth");
const LocalStrategy = require("passport-local").Strategy;
const userBooking = require("./routes/userBooking");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking");
const crypto = require("crypto");
const { User } = require("./modals/auth");
const { isAuth, sanitizer } = require("./services/common");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
// Middlewares

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

server.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
server.use(express.json());
server.use(passport.initialize());
server.use(passport.session());

// Routes
server.use("/", authRouter.router);
server.use("/", isAuth(),bookingRouter.router);
server.use("/", userBooking.router);
server.use("/", userRouter.router);

// Passport
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "Sorry, this email doesn't exist!" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return done(err);
          }
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }
          const token = jwt.sign(sanitizer(user), secret);
          return done(null, token);
        }
      );
      
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({_id:jwt_payload.id});
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
  console.log("serializer", user);
  process.nextTick(function () {
    cb(null, sanitizer(user));
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializer ", user);
  process.nextTick(function () {
    cb(null, sanitizer(user));
  });
});

connectToDb();
server.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
