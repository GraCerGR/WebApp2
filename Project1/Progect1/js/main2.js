const CANVAS_HEIGHT = 400;
  const CANVAS_WIDTH = 400;
  const WHITE_LEVEL = 0.5;
  const BLACK = 0;
  const WHITE = 1;
  const COLORS = {
    [BLACK]: 'black',
    [WHITE]: 'white'
  };
  const PIXEL_RATIO = 10;
  const MATRIX_DIMENSIONS = {
    height: CANVAS_HEIGHT / PIXEL_RATIO,
    width: CANVAS_WIDTH / PIXEL_RATIO
  };
  const canvas = document.querySelector('canvas');
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  //Генерация рандомных значений белого и чёрного
function generateWhiteNoise(size, whiteLevel = .6) {
    return new Array(size).fill(0)
      .map(() => Math.random() >= whiteLevel ? BLACK : WHITE);
  }

//генерация массива из рандомных значений белого и чёрного
function init() {
    const noise_matrix = new Array(MATRIX_DIMENSIONS.height).fill(0)
      .map(() => {
        return generateWhiteNoise(MATRIX_DIMENSIONS.width, WHITE_LEVEL);
      });

    draw(noise_matrix);
}


init();

    //Рисование матрицы
  function draw(matrix) {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
	ctx.beginPath();
	matrix.forEach((pixelsRow, rowIndex) => {
		const y = rowIndex * PIXEL_RATIO;
		pixelsRow.forEach((pixel, pixelIndex) => {
			const x = pixelIndex * PIXEL_RATIO;
			ctx.fillStyle = COLORS[pixel];
			ctx.fillRect(x, y, PIXEL_RATIO, PIXEL_RATIO);
		});
	});
	ctx.closePath();
}