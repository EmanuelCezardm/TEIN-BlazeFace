async function findFaces() {
  const model = await blazeface.load();
  const img = document.querySelector("img");
  const predictions = await model.estimateFaces(img, false);
  const distanciaMinima = 200;

  if (predictions.length > 0) { 

    console.log(predictions);
    document.getElementById("status").innerText = "Rosto Encontrado!";
    const canvas = document.getElementById("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < predictions.length; i++) {

      ctx.fillStyle = corDoQuadradoDoRosto(i);

      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      ctx.fillRect(start[0], start[1], size[0], size[1]);

      const boca1 = predictions[i].landmarks[3];

      for (let j = i + 1; j < predictions.length; j++) {
        const boca2 = predictions[j].landmarks[3];
        const distancia = Math.abs(Math.sqrt(Math.pow(boca2[0] - boca1[0], 2) + Math.pow(boca2[1] - boca1[1], 2))).toFixed(2); // formula para calcular a distancia entre dois pontos.

        if (distancia < distanciaMinima) {
          console.log("ALERTA! " + pessoaDaFoto(i) + " está a " + distancia + " pixels de distância da(o) " + pessoaDaFoto(j) + ", distância menor do que 1.5 metros.");
          alert("ALERTA! " + pessoaDaFoto(i) + " está a " + distancia + " pixels de distância da(o) " + pessoaDaFoto(j) + ", distância menor do que 1.5 metros.");
        }
      }
    }
  } else {
    document.getElementById("status").innerText = "Nenhum rosto encontrado!";
  }
}
findFaces();

function pessoaDaFoto(i){
  switch(i){
    case 0:
      return "Kailane";
    case 1:
      return "Angelina";
    case 2:
      return "Silvana";
    case 3:
      return "Alice";
    case 4:
      return "Emanuel";
    case 5:
      return "Taymara";
  }
}

function corDoQuadradoDoRosto(i){
  switch(i){
    case 0:
      return "rgba(0, 0, 0, 0.5)";
    case 1:
      return "rgba(255, 0, 0, 0.5)";
    case 2:
      return "rgba(0, 255, 0, 0.5)";
    case 3:
      return "rgba(0, 0, 255, 0.5)";
    case 4:
      return "rgba(0, 191, 255, 0.5)";
    case 5:
      return "rgba(75, 0, 130, 0.5)";
  }
}