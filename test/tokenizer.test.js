import {tokenize} from "../src/tokenizer.js";

test("tokenize - simple line", () => {
    const result1 = tokenize("M 10   10 L 20 20");
    expect(result1.length).toEqual(2);
    expect(result1[0][0]).toEqual("M");
    expect(result1[0][1]).toEqual("10");
    expect(result1[0][1]).toEqual("10");
    expect(result1[1][0]).toEqual("L");
    expect(result1[1][1]).toEqual("20");
    expect(result1[1][1]).toEqual("20");

    const result2 = tokenize("M10 10 L20 20");
    expect(result2.length).toEqual(2);
    expect(result2[0][0]).toEqual("M");
    expect(result2[0][1]).toEqual("10");
    expect(result2[0][1]).toEqual("10");
    expect(result2[1][0]).toEqual("L");
    expect(result2[1][1]).toEqual("20");
    expect(result2[1][1]).toEqual("20");

    const result3 = tokenize("M10,10L20,20");
    expect(result3.length).toEqual(2);
    expect(result3[0][0]).toEqual("M");
    expect(result3[0][1]).toEqual("10");
    expect(result3[0][1]).toEqual("10");
    expect(result3[1][0]).toEqual("L");
    expect(result3[1][1]).toEqual("20");
    expect(result3[1][1]).toEqual("20");
});

test("tokenize - curve", () => {
   const result = tokenize("M 10 10 C 20 20, 40 20, 50 10");
    expect(result[0][0]).toEqual("M");
    expect(result[0][1]).toEqual("10");
    expect(result[0][1]).toEqual("10");
    expect(result[1][0]).toEqual("C");
    expect(result[1][1]).toEqual("20");
    expect(result[1][2]).toEqual("20");
    expect(result[1][3]).toEqual("40");
    expect(result[1][4]).toEqual("20");
    expect(result[1][5]).toEqual("50");
    expect(result[1][6]).toEqual("10");
});