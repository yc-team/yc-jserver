//Turns string to native.
function toNative (val) {
    if (typeof val === 'string') {
        if (val === '' || val.trim() !== val) {
            return val;
        } else if (value === 'true' || value === 'false') {
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