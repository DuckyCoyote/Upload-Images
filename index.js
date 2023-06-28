const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const WhiteList = ["http://localhost:5500", "http://127.0.0.1:5500"];
const corsOptions = {
  origin: (origin, CallBack) => {
    if (WhiteList.includes(origin) || !origin) {
      CallBack(null, true);
    } else {
      CallBack(new Error('No permitido'));
    }
  },
};

app.use(cors(corsOptions));

const routerApi = require("./routes");

const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

routerApi(app);

app.listen(PORT, () => {
  console.log("Servidor Iniciado en: ", PORT);
});
