/**
 * Image data.
 */
const imageWidth = 9;
const imageHeight = 8;
const imageData = createImageData();



/**
 * Instructions & execution.
 */
// Draw head...
drawRectangle(0, 0, 9, 8);
// eyes...
drawDot(3, 2);
drawDot(5, 2);
// mouth.
drawHorizontalLine(2, 5, 5);
drawDot(2, 4);
drawDot(6, 4);

//drawCircle(7, 7, 6);

// Output what we drew to the console.
outputImage();



/**
 * Draw rectangle on the canvas.
 * 
 * @param x - Start location on x axis.
 * @param y - Start location on y axis.
 * @param width - Rectangle width.
 * @param height - Rectangle height.
 */
function drawRectangle(
	x: number,
	y: number,
	width: number,
	height: number
) {
	// top
	drawHorizontalLine(x, y, width);
	// bottom
	drawHorizontalLine(x, y + height - 1, width);
	// left
	drawVerticalLine(x, y, height);
	// right
	drawVerticalLine(x + width - 1, y, height);
}



/**
 * Gets if the provided point is in the image.
 * @param x - The horizontal position within
 * the image.
 * @param y - The vertical position within
 * the image.
 */
function isPointInImage(x: number, y: number) {
	return x >= 0 && x < imageWidth && y >= 0 && y < imageHeight;
}



/**
 * Outputs the image data state to the console.
 * @param onChar - Character to render an
 * "on" pixel with.
 * @param offChar - Character to render an
 * "off" pixel with.
 */
function outputImage(onChar = "O", offChar = " ") {
	let text = "";

	for (let i = 0; i < imageData.length; i++) {
		if (i > 0 && i % imageWidth === 0) {
			text += "\n"; // new line
		}

		text += imageData[i] ? onChar : offChar;
	}

	console.log(text);
}



/**
 * Creates an array of booleans where a pixel
 * is "on" when the value is `true` and "off"
 * when the value is `false`.
 *
 * The pixel values are stored in rows
 * (row-major order) where the index of a
 * pixel in the array can be found via:
 *
 *		 index = y * imageWidth + x
 *	
 * `x` is the horizontal position in the image
 * and `y` is the vertical position from the top
 * left corner.
 * 
 * Note: This function has a return type annotation
 * of `boolean[]`. That means it's an array of
 * booleans. We'll learn more about this in a
 * future module.
 */
function createImageData(): boolean[] {
	// create array of size `length` containing `false` values
	const length = imageWidth * imageHeight;
	return new Array(length).fill(false);
}



/**
 * Draw a dot on the canvas.
 * 
 * @param x - Location on x axis.
 * @param y - Location on y axis.
 */
function drawDot (x: number, y: number): void {
	if (isPointInImage(x, y)) {
		imageData[y * imageWidth + x] = true;
	}
}



/**
 * Draw a horizontal line on the canvas.
 * 
 * This function draws the line form left to right.
 * 
 * @param x - Start location on x axis.
 * @param y - Start location on y axis.
 * @param width - Line length.
 */
function drawHorizontalLine (x: number, y:number, width: number): void {
	for (let i = 0; i < width; i++) {
		drawDot(x + i, y);
	}
}



/**
 * Draw a vertical line on the canvas.
 * 
 * This function draws the line downwards.
 * 
 * @param x - Start location on x axis.
 * @param y - Start location on y axis.
 * @param length - Line length.
 */
function drawVerticalLine (x: number, y: number, length: number): void {
	for (let i = 0; i < length; i++) {
		drawDot(x, y + i);
	}
}




/**
 * Draw a circle on the canvas.
 * 
 * @param x - Start location on x axis.
 * @param y - Start location on y axis.
 * @param radius - Circle radius.
 */
function drawCircle (x: number, y: number, radius: number): void {
	for (let yy = 0; yy < imageHeight; yy++) {
		if (yy >= y - radius && yy <= y + radius) {
			for (let xx = 0; xx < imageWidth; xx++) {
				if (xx >= x - radius && xx <= x + radius) {
					let vSteps = y > yy ? y - yy : yy - y;
					let hSteps = x > xx ? x - xx : xx - x;
					if (vSteps + hSteps === radius) {
						drawDot(xx, yy);
					}
				}
			}
		}
	}
}

