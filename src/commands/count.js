import fs from "fs";
import { createReadStream } from "fs";

export async function countFile(filePath) {
    return new Promise((resolve, reject) => {
        let lines = 0;
        let words = 0;
        let chars = 0;

        const stream = createReadStream(filePath, "utf8");

        stream.on("data", (chunk) => {
        chars += chunk.length;

        lines += chunk.split("\n").length - 1;

        const wordList = chunk.trim().split(/\s+/);
            if (wordList[0] !== "") {
                words += wordList.length;
            }
        });

        stream.on("end", () => {
            console.log(`Lines: ${lines}`);
            console.log(`Words: ${words}`);
            console.log(`Characters: ${chars}`);
            resolve();
        });

        stream.on("error", reject);
    });
}