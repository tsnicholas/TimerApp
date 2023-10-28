let lastId = 0;

export function genID(): string {
    const randInt = Math.random() * 10 ** 15;
    const perfNowInt = (performance.now() % 10 ** 5) * 10 ** 10;
    const p = (randInt + perfNowInt + lastId++).toFixed().toString();
    return `id-${p}`;
}

export function getRandomColor(): string {
    console.log("Generating a color.");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return `#${randomColor}`;
}
