import os from "os";
import { startRepl } from "./repl";

const homeDir = os.homedir();

console.log("Welcome to Data Processing CLI!");
console.log(`You are currently in your home directory: ${homeDir}`)

startRepl(homeDir);