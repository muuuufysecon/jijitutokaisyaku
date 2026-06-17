"use strict";
// image-compression-utils.js に切り出しやすい領域
const compressImageTo100KB = (img) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width = img.width, height = img.height, max_dim = 800;
    if (width > max_dim || height > max_dim) {
        if (width > height) {
            height *= max_dim / width;
            width = max_dim;
        }
        else {
            width *= max_dim / height;
            height = max_dim;
        }
    }
    let quality = 0.8;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    let dataUrl = canvas.toDataURL('image/jpeg', quality);
    let sizeKB = Math.round(dataUrl.length * 3 / 4) / 1024;
    let attempts = 0;
    const MAX_ATTEMPTS = 15;
    while (sizeKB > 100 && attempts < MAX_ATTEMPTS) {
        if (quality > 0.3) {
            quality -= 0.1;
        }
        else {
            width *= 0.8;
            height *= 0.8;
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            quality = 0.7;
        }
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        sizeKB = Math.round(dataUrl.length * 3 / 4) / 1024;
        attempts++;
    }
    return dataUrl;
};
