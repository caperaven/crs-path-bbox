const markers = ["M", "L", "H", "V", "C", "Z", "S", "Q", "T", "A"];

/**
 * Break the path information into processable parts
 * @param {string} path - path string to process.
 */
export function tokenize(path) {
    const indexes = [];
    for (let i = 0; i < path.length; i++) {
        const char = path[i];
        if (markers.indexOf(char) !== -1) {
            indexes.push(i);
        }
    }

    let lastIndex = 0;
    const splices = [];
    for (let index of indexes) {
        splices.push(path.substring(lastIndex, index));
        lastIndex = index;
    }
    splices.push(path.substring(lastIndex, path.length));
    splices.splice(0, 1);
    const result = formatSplices(splices);
    return result;
}

/**
 * process all the splices and populate the tokens array
 * @param  {array<string>} splices
 * @returns {[]}
 */
function formatSplices(splices) {
    const tokens = [];
    for (let splice of splices) {
        formatSplice(splice, tokens);
    }
    return tokens;
}

function formatSplice(splice, tokens) {
    const result = [];
    let chars = [];
    for (let char of splice) {
        if (char.trim().length > 0 && char !== ",") {
            if (markers.indexOf(char) != -1) {
                if (chars.length > 0) {
                    result.push(chars.join(""));
                    chars.length = 0;
                }
                result.push(char);
            }
            else {
                chars.push(char);
            }
        }
        else if (chars.length != 0) {
            result.push(chars.join(""));
            chars.length = 0;
        }
    }

    if (chars.length != 0) {
        result.push(chars.join(""));
    }

    tokens.push(result);
}