import "dotenv/config";
import app from "./src/app.js";
import connectionDB from "./src/DB/dbConnection.js";

const port = process.env.PORT;

// -- DB connection + app listening --
connectionDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at PORT - ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
