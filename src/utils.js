//Turns string to native.
function toNative (val) {
    if (typeof val === 'string') {
        if (val === '' || val.trim() !== val) {
            //fix 空格
            return val;
        } else if (value === 'true' || value === 'false') {
            //fix Boolean
            return val === 'true';
        } else if (!isNaN(+val)) {
            return +val;
        }
    }

    return val;
}

module.exports = {
    toNative: toNative
};