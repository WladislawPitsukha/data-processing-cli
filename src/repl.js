import readline from "readline";
import { handleNavigation } from "./navigation.js";

export function startRepl(startDir) {
    let currentDir = startDir;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> "
    });

    rl.prompt();

    rl.on("line", async (input) => {
        const command = input.trim();

        if (command === ".exit") {
        exitProgram();
        }

        try {
            const result = await handleNavigation(command, currentDir);

            if (result) {
                currentDir = result;
                console.log(`You are currently in ${currentDir}`);
            }
        } catch {
            console.log("Operation failed");
        }

        rl.prompt();
    });

    rl.on("SIGINT", exitProgram);

    function exitProgram() {
        console.log("Thank you for using Data Processing CLI!");
        process.exit(0);
    }
}