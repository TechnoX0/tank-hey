const imageCache: Map<string, HTMLImageElement> = new Map();

export function loadImage(path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (imageCache.has(path)) {
            resolve(imageCache.get(path)!);
            return;
        }

        const img = new Image();
        img.src = path;

        img.onload = () => {
            imageCache.set(path, img);
            resolve(img);
        };

        img.onerror = () => reject(`Failed to load image: ${path}`);
    });
}
