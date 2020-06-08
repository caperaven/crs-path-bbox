import {tokenize} from "./tokenizer.js";

export class Measure {
    static pathData(path) {
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

    static path(element) {
        return this.pathData(element.getAttribute("d"));
    }

    static rect(element) {
        const x = Number(element.getAttribute("x"));
        const y = Number(element.getAttribute("y"));
        const x2 = x + Number(element.getAttribute("width"));
        const y2 = y + Number(element.getAttribute("height"));

        return this._setAABB(x, y, x2, y2);
    }

    static circle(element) {
        const r = Number(element.getAttribute("r"));
        const x = Number(element.getAttribute("cx"));
        const y = Number(element.getAttribute("cy"));

        return this._setAABB(x - r, y - r, x + r, y + r);
    }

    static ellipse(element) {
        const rx = Number(element.getAttribute("rx"));
        const ry = Number(element.getAttribute("ry"));
        const x = Number(element.getAttribute("cx"));
        const y = Number(element.getAttribute("cy"));

        return this._setAABB(x - rx, y - ry, x + rx, y + ry);
    }

    static line(element) {
        const x1 = Number(element.getAttribute("x1"));
        const y1 = Number(element.getAttribute("y1"));
        const x2 = Number(element.getAttribute("x2"));
        const y2 = Number(element.getAttribute("y2"));

        return this._setAABB(x1, y1, x2, y2);
    }

    static polyline(element) {
        const aabb = {
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE,
            x2: Number.MIN_VALUE,
            y2: Number.MIN_VALUE
        };

        const data = element.getAttribute("points")
            .split(" ").join("/")
            .split(",/").join("/")
            .split("/");

        for (let i = 0; i < data.length; i += 2) {
            this._setBounds(aabb, Number(data[i]), Number(data[i + 1]));
        }

        return aabb;
    }

    static _setAABB(x, y, x2, y2) {
        const aabb = {
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE,
            x2: Number.MIN_VALUE,
            y2: Number.MIN_VALUE
        };

        this._setBounds(aabb, x, y);
        this._setBounds(aabb, x2, y2);
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

    static a(token, aabb) {
        this._setBounds(aabb, Number(token[1]), Number(token[2]));
        this._setBounds(aabb, Number(token[6]), Number(token[7]));
    }

    static t(token, aabb) {
        this._setBounds(aabb, Number(token[1]), Number(token[2]));
    }
}