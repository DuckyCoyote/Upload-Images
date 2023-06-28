const elementImage = document.querySelector("#imagenes");

const getNames = async () => {
  const imageNames = await fetch("http://localhost:3000/api/v1/imagenes/image")
    .then((response) => response.json())
    .then((response) => response);
  return imageNames;
};

const getImages = async () => {
  const name = await getNames();
  name.map((img) => {
    let div = document.createElement("div");
    div.className = "images";
    div.innerHTML = `<img src="http://localhost:3000/api/v1/imagenes/${img}" alt="administrador"></img>`;
    elementImage.appendChild(div);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await getImages();
});
