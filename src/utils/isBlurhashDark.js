/* eslint-disable no-restricted-properties */

const digitCharacters =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~";

const decode83 = (str) => {
  let value = 0;

  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    const digit = digitCharacters.indexOf(c);
    value = value * 83 + digit;
  }

  return value;
};

const linearTosRGB = (value) => {
  const v = Math.max(0, Math.min(1, value));
  if (v <= 0.0031308) {
    return Math.round(v * 12.92 * 255 + 0.5);
  }

  return Math.round((1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255 + 0.5);
};

export const sRGBToLinear = (value) => {
  const v = value / 255;
  if (v <= 0.04045) {
    return v / 12.92;
  }
  return Math.pow((v + 0.055) / 1.055, 2.4);
};

const decodeDC = (value) => {
  const intR = value >> 16;
  const intG = (value >> 8) & 255;
  const intB = value & 255;
  return [sRGBToLinear(intR), sRGBToLinear(intG), sRGBToLinear(intB)];
};

const sign = (n) => (n < 0 ? -1 : 1);

const signPow = (val, exp) => sign(val) * Math.pow(Math.abs(val), exp);

const decodeAC = (value, maximumValue) => {
  const quantR = Math.floor(value / (19 * 19));
  const quantG = Math.floor(value / 19) % 19;
  const quantB = value % 19;

  const rgb = [
    signPow((quantR - 9) / 9, 2.0) * maximumValue,
    signPow((quantG - 9) / 9, 2.0) * maximumValue,
    signPow((quantB - 9) / 9, 2.0) * maximumValue,
  ];

  return rgb;
};

export default function isBlurhashDark(blurhash) {
  const sizeFlag = decode83(blurhash[0]);
  const numY = Math.floor(sizeFlag / 9) + 1;
  const numX = (sizeFlag % 9) + 1;

  const quantisedMaximumValue = decode83(blurhash[1]);
  const maximumValue = (quantisedMaximumValue + 1) / 166;

  const colors = new Array(numX * numY);

  for (let i = 0; i < colors.length; i += 1) {
    if (i === 0) {
      const value = decode83(blurhash.substring(2, 6));
      colors[i] = decodeDC(value);
    } else {
      const value = decode83(blurhash.substring(4 + i * 2, 6 + i * 2));
      colors[i] = decodeAC(value, maximumValue * 2);
    }
  }

  let r = 0;
  let g = 0;
  let b = 0;

  for (let j = 0; j < numY; j += 1) {
    for (let i = 0; i < numX; i += 1) {
      const basis = Math.cos(Math.PI * i);
      const color = colors[i + j * numX];
      r += color[0] * basis;
      g += color[1] * basis;
      b += color[2] * basis;
    }
  }

  const intR = linearTosRGB(r);
  const intG = linearTosRGB(g);
  const intB = linearTosRGB(b);

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (intR * intR) + 0.587 * (intG * intG) + 0.114 * (intB * intB)
  );

  // Using the HSP value, determine whether the color is light or dark
  return hsp <= 127.5;
}
