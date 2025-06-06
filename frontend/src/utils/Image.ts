const imageCache: Record<string, HTMLImageElement> = {};

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (imageCache[url]?.complete) {
            resolve(imageCache[url]);
            return;
        }

        const img = new Image();
        img.src = url;

        img.onload = () => {
            imageCache[url] = img;
            resolve(img);
        };

        img.onerror = reject;
    });
}

export function changeSpriteColor(
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
): ImageData {
    const imageData = ctx.getImageData(x, y, canvas.width, canvas.height);
    const data = imageData.data;

    // Target range: reddish tones
    const targetColor = { r: 100, g: 70, b: 60 };
    const tolerance = 60;

    // Replacement color: green
    const newColor = { r: 0, g: 200, b: 0 };

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip transparent pixels
        if (a === 0) continue;

        // Check if the pixel is within range of the target color
        const inRange =
            Math.abs(r - targetColor.r) < tolerance &&
            Math.abs(g - targetColor.g) < tolerance &&
            Math.abs(b - targetColor.b) < tolerance;

        if (inRange) {
            data[i] = newColor.r;
            data[i + 1] = newColor.g;
            data[i + 2] = newColor.b;
            // Leave alpha unchanged
        }
    }

    // ctx.putImageData(imageData, 0, 0);
    return imageData;
}
