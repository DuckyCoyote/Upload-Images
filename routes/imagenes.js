const express = require("express");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const { models } = require("./../config/sequelize");

const upload = multer({
  limits: {
    files: 5,
  },
});

const router = express.Router();

router.get("/image", async (req, res, next) => {
  try {
    const img = await models.Image.findAll();
    let images = [];
    img.forEach((image) => {
      images.push(image.dataValues.rutaImg);
    });
    res.json(images);
  } catch (error) {
    next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const image = path.join(__dirname, "../", "assets", "img", `${name}`);
    res.sendFile(image);
  } catch (error) {
    next(error);
  }
});

router.post("/upload", upload.array("image"), async (req, res, next) => {
  try {
    // const { image } = req.files;
    // await image.mv(path.join(__dirname, "../", "assets", "img", image.name));
    // res.sendStatus(200);<- express-fileupload
    /*
    const outputPath = path.join(
      path.dirname(imagePath),
      `${path.basename(filename, path.extname(filename))}.webp`
    );
    await sharp(imagePath).toFormat("webp").toFile(outputPath); <- Multer Disk Storage and Sharp*/
    const files = req.files;
    if (files.length > 5) {
      return res
        .status(400)
        .json({ error: "Solo puedes cargar un maximo de 10 archivos!" });
    }

    for (const file of files) {
      const { buffer } = file;
      const optimizedImage = await sharp(buffer).toFormat("webp").toBuffer();

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `image-${uniqueSuffix}.webp`;
      const imagePath = path.join(__dirname, "../", "assets", "img", fileName);
      await fs.promises.writeFile(imagePath, optimizedImage);
      await models.Image.create({ rutaImg: fileName });
    }
    res.redirect("http://localhost:5500/public/index.html");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
