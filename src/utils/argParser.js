export function parseArgs(tokens) {
    const args = {};

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.startsWith("--")) {
        const key = token.replace("--", "");

        const next = tokens[i + 1];

        if (!next || next.startsWith("--")) {
            args[key] = true;
        } else {
            args[key] = next;
            i++;
        }
        }
    }

    return args;
}