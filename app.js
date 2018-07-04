const { registerFont, createCanvas, loadImage } = require('canvas');
const fs = require('fs')

registerFont('./fonts/sazanami/sazanami-gothic.ttf', {family: 'Sazanami Gothic'});
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext('2d');

// Draw cat with lime helmet
loadImage('images/lemon-sour.jpg').then((image) => {
  ctx.drawImage(image, 0, 0, 500, 500);

  // Write "Awesome!"
  ctx.font = '50px "Sazanami Gothic"';
  // ctx.rotate(0.1);
  ctx.fillText('レモンサワー!', 100, 100);

  // Draw line under text
  var text = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.9)';
  ctx.beginPath();
  ctx.lineTo(100, 102);
  ctx.lineTo(100 + text.width + 110, 102);
  ctx.stroke();

  // console.log('<img src="' + canvas.toDataURL() + '" />');

  const out = fs.createWriteStream(__dirname + '/dist/generate-image.jpeg');
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on('finish', () =>  console.log('The JPEG file was created.'));
});

