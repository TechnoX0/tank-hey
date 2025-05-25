const imageCache: Record<string, HTMLImageElement> = {};

export function loadTankImage(tankClass: string): HTMLImageElement | null {
    if (imageCache[tankClass]) return imageCache[tankClass];

    const img = new Image();
    img.src = `/assets/TankSprites/${tankClass}.png`; // must be in public/assets/...
    imageCache[tankClass] = img;

    return img;
}