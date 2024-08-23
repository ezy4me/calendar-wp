// utils/colorUtils.js
export const darkenColor = (color, percent) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, Math.round(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.round(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.round(b * (1 - percent))));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const addBlueColor = (color, percent) => {
    percent = Math.min(1, Math.max(0, percent)); // Ограничение диапазона от 0 до 1

    if (!/^#[0-9A-F]{6}$/i.test(color)) {
        return color;
    }

    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Добавляем синий цвет в зависимости от процента
    b = Math.min(255, Math.round(b + (255 - b) * percent));

    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};



export const increaseColorSaturation = (color, percent) => {
    // Преобразуем HEX цвет в RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Преобразуем RGB цвет в HSL
    const rPercent = r / 255;
    const gPercent = g / 255;
    const bPercent = b / 255;

    const max = Math.max(rPercent, gPercent, bPercent);
    const min = Math.min(rPercent, gPercent, bPercent);
    const lightness = (max + min) / 2;

    let saturation = 0;
    if (max !== min) {
        saturation = (max - lightness) / (lightness < 0.5 ? max + min : 2.0 - max - min);
    }

    const hue = ((max === rPercent ? (gPercent - bPercent) / (max - min) :
        max === gPercent ? 2 + (bPercent - rPercent) / (max - min) :
            4 + (rPercent - gPercent) / (max - min)) * 60) % 360;

    // Увеличиваем насыщенность
    saturation = Math.min(1, saturation + percent);

    // Преобразуем HSL обратно в RGB
    const hslToRgb = (h, s, l) => {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // Цвет в сером оттенке
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            const hueToRgb = (t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            r = hueToRgb(h / 360 + 1 / 3);
            g = hueToRgb(h / 360);
            b = hueToRgb(h / 360 - 1 / 3);
        }

        return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
    };

    return hslToRgb(hue, saturation, lightness);
};
