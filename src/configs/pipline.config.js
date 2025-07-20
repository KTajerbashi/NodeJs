const {
  express,
  session,
  cookieParser,
  flash,
  morgan,
  helmet,
  cors,
} = require("../global.using");

const authController = require("../controllers/auth.controller");
module.exports = class MiddlewarePipes {
  static configuration(app) {
    // Cookie parser middleware (needed for sessions)
    app.use(cookieParser());

    // Session configuration
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "Tajer-Secret_Key",
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
      })
    );

    app.use(flash());

    // Make flash messages available to all views
    app.use((req, res, next) => {
      res.locals.messages = req.flash();
      next();
    });

    // Middleware
    app.use(morgan("dev"));

    app.use(helmet());

    app.use(cors());

    // For JSON bodies (API requests)
    app.use(express.json());

    // For URL-encoded forms (traditional HTML forms)
    app.use(express.urlencoded({ extended: true }));

    app.use(authController.errorHandler);
  }
};
