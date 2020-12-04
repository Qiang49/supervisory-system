export const readFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            const data = e.target.result;
            resolve(data);
        };
        reader.onerror = () => {
            const err = new Error("读取图片失败");
            reject(err.message);
        };

        reader.readAsDataURL(file);
    });
};