import fs from "fs/promises";
import path from "path";

export async function handleNavigation(command, currentDir) {
    const [cmd, arg] = command.split(" ");

    if (cmd === "up") {
        const parent = path.dirname(currentDir);
        return parent;
    }

    if (cmd === "cd") {
        if (!arg) {
            console.log("Invalid input");
            return;
        }

        const newPath = path.resolve(currentDir, arg);

        const stat = await fs.stat(newPath);

        if (!stat.isDirectory()) {
            throw new Error();
        }

        return newPath;
    }

    if (cmd === "ls") {
        const files = await fs.readdir(currentDir, { withFileTypes: true });

        const folders = files
        .filter((f) => f.isDirectory())
        .map((f) => `${f.name}    [folder]`)
        .sort();

        const regularFiles = files
        .filter((f) => f.isFile())
        .map((f) => `${f.name}    [file]`)
        .sort();

        [...folders, ...regularFiles].forEach((f) => console.log(f));

        return currentDir;
    }

    console.log("Invalid input");
}