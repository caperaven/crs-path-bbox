import {tokenize} from "./tokenizer.js";

export class Measure {
    static get(path) {
        const tokens = tokenize(path);

        const aabb = {
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE,
            x2: Number.MIN_VALUE,
            y2: Number.MIN_VALUE
        };

        for (let token of tokens) {
            const name = token[0].toLowerCase();
            this[name](token, aabb);
        }

        return aabb;
    }

    static _setBounds(aabb, x, y) {
        if (x !== null) {
            aabb.x = x < aabb.x ? x : aabb.x;
            aabb.x2 = x > aabb.x2 ? x : aabb.x2;
        }

        if (y !== null) {
            aabb.y = y < aabb.y ? y : aabb.y;
            aabb.y2 = y > aabb.y2 ? y : aabb.y2;
        }

        aabb.width = aabb.x2 - aabb.x;
        aabb.height = aabb.y2 - aabb.y;
    }

    static xy(token, aabb) {
        this._setBounds(aabb, Number(token[1]), Number(token[2]))
    }

    static m(token, aabb) {
        this.xy(token, aabb);
    }

    static l(token, aabb) {
        this.xy(token, aabb);
    }

    static h(token, aabb) {
        this._setBounds(aabb, Number(token[1]));
    }

    static v(token, aabb) {
        this._setBounds(aabb, null, Number(token[1]));
    }

    static curves(token, aabb) {
        this._setBounds(aabb, Number(token[1]), Number(token[2]));
        this._setBounds(aabb, Number(token[3]), Number(token[4]));
        this._setBounds(aabb, Number(token[5]), Number(token[6]));
    }

    static c(token, aabb) {
        this.curves(token, aabb);
    }

    static s(token, aabb) {
        this.curves(token, aabb);
    }

    static q(token, aabb) {
        this.curves(token, aabb);
    }
}