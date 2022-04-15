import * as Ports from "ports.lib.js";

class TestCase {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}

/** @param {NS} ns */
export async function main(ns) {
    const testCases = [
        new TestCase([
            [50, 30, 22, 36, 11, 11, 48, 42, 10, 1, 21, 23, 47, 46],
            [40, 26, 11, 26, 2, 25, 30, 38, 34, 16, 27, 37, 35, 40],
            [41, 30, 47, 49, 44, 47, 26, 34, 29, 30, 27, 9, 32, 18],
            [13, 14, 39, 35, 35, 33, 16, 15, 24, 4, 44, 25, 38, 43],
            [1, 27, 19, 15, 27, 44, 25, 18, 8, 8, 9, 23, 47, 31],
            [43, 50, 24, 47, 49, 12, 46, 42, 10, 32, 35, 38, 31, 8],
            [24, 26, 27, 48, 34, 45, 45, 44, 47, 4, 32, 18, 8, 33]
        ], [
            50, 30, 22, 36, 11, 11, 48, 42, 10, 1, 21, 23, 47, 46, 40, 18, 43, 31, 8,
            33, 8, 18, 32, 4, 47, 44, 45, 45, 34, 48, 27, 26, 24, 43, 1, 13, 41, 40,
            26, 11, 26, 2, 25, 30, 38, 34, 16, 27, 37, 35, 32, 38, 47, 31, 38, 35, 32,
            10, 42, 46, 12, 49, 47, 24, 50, 27, 14, 30, 47, 49, 44, 47, 26, 34, 29,
            30, 27, 9, 25, 23, 9, 8, 8, 18, 25, 44, 27, 15, 19, 39, 35, 35, 33, 16,
            15, 24, 4, 44
        ]),
        new TestCase([
            [49, 44, 21, 9],
            [18, 3, 5, 35],
            [46, 50, 3, 11],
            [9, 15, 8, 22],
            [38, 45, 8, 38]
        ], [
            49, 44, 21, 9, 35, 11, 22, 38, 8, 45, 38, 9, 46, 18, 3, 5, 3, 8, 15, 50
        ]),
        new TestCase([
            [50, 49, 24, 2, 39],
            [29, 33, 15, 41, 32],
            [15, 14, 25, 22, 18],
            [25, 28, 14, 19, 32],
            [17, 20, 5, 13, 10],
            [33, 17, 34, 10, 22],
            [45, 3, 23, 28, 1],
            [16, 49, 29, 26, 46],
            [44, 1, 35, 36, 25],
            [23, 12, 35, 4, 32],
            [30, 6, 17, 8, 1],
            [30, 3, 40, 5, 37],
            [36, 34, 1, 39, 15]
        ], [
            50, 49, 24, 2, 39, 32, 18, 32, 10, 22, 1, 46, 25, 32, 1, 37, 15, 39, 1,
            34, 36, 30, 30, 23, 44, 16, 45, 33, 17, 25, 15, 29, 33, 15, 41, 22, 19,
            13, 10, 28, 26, 36, 4, 8, 5, 40, 3, 6, 12, 1, 49, 3, 17, 20, 28, 14, 25,
            14, 5, 34, 23, 29, 35, 35, 17
        ]),
        new TestCase([
            [10, 41, 19, 12, 11, 46, 14, 24, 13, 27, 5],
            [24, 44, 46, 34, 9, 20, 42, 42, 35, 25, 5],
            [10, 50, 41, 34, 15, 48, 22, 38, 39, 23, 38],
            [29, 32, 48, 50, 43, 15, 24, 29, 5, 35, 18],
            [32, 18, 12, 17, 47, 29, 1, 41, 45, 40, 33],
            [25, 44, 33, 35, 36, 23, 32, 23, 13, 13, 36],
            [49, 18, 1, 24, 18, 25, 21, 2, 29, 11, 34],
            [21, 36, 7, 23, 42, 37, 5, 35, 42, 36, 4],
            [49, 28, 43, 20, 33, 36, 37, 14, 16, 48, 49],
            [33, 30, 28, 27, 41, 9, 39, 15, 43, 47, 32],
            [28, 44, 9, 42, 28, 17, 46, 13, 17, 21, 16],
            [8, 40, 17, 20, 4, 38, 21, 49, 23, 7, 26],
            [9, 19, 46, 44, 10, 36, 48, 16, 37, 10, 3]
        ], [
            10, 41, 19, 12, 11, 46, 14, 24, 13, 27, 5, 5, 38, 18, 33, 36, 34, 4, 49,
            32, 16, 26, 3, 10, 37, 16, 48, 36, 10, 44, 46, 19, 9, 8, 28, 33, 49, 21,
            49, 25, 32, 29, 10, 24, 44, 46, 34, 9, 20, 42, 42, 35, 25, 23, 35, 40, 13,
            11, 36, 48, 47, 21, 7, 23, 49, 21, 38, 4, 20, 17, 40, 44, 30, 28, 36, 18,
            44, 18, 32, 50, 41, 34, 15, 48, 22, 38, 39, 5, 45, 13, 29, 42, 16, 43, 17,
            13, 46, 17, 28, 42, 9, 28, 43, 7, 1, 33, 12, 48, 50, 43, 15, 24, 29, 41,
            23, 2, 35, 14, 15, 39, 9, 41, 27, 20, 23, 24, 35, 17, 47, 29, 1, 32, 21,
            5, 37, 36, 33, 42, 18, 36, 23, 25, 37
        ])
    ];

    for (let [index, test] of testCases.entries()) {
        ns.run(`contracts/sm.js`, 1, JSON.stringify(test.input), Ports.CONTRACT_TEST_PORT);

        let port = ns.getPortHandle(Ports.CONTRACT_TEST_PORT);
        while (port.empty()) {
            await ns.sleep(1);
        }

        let response = JSON.parse(port.read());
        let result = response.every((_, i) => response[i] === test.output[i]);
        ns.tprint(`Test ${index + 1}/${testCases.length}: ${result ? `PASS` : `!!!! FAILED !!!!`}`);
        if (!result) {
            ns.tprint(`    Expected: ${JSON.stringify(test.output)}, Received: ${JSON.stringify(response)}`);
        }
    }
}
