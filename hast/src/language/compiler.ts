
import { HastProgram, Function } from "./struct.ts";

const empty: Function = {name: "", body: []};

export async function Compile(program: HastProgram, part: string) {
    parseFileStart(program);
    ParseData(program.data, program);
    if (part == "" || part == undefined) {
        await parse(program.main, program);
    }
    else if (part == "run") {
        await parse(program.run, program);
    }
    else if (part == "clear") {
        await parse(program.clear, program);
    }
    else if (functionByName(program, part) != undefined) {
        await parse(functionByNameSafe(program, part).body, program);
    }
    else {
        throw new Error("Invalid part: " + part);
    }
}

function functionByName(program: HastProgram, name: string): Function | undefined {
    for (const func of program.privateFunctions) {
        if (func.name == name) {
            return func;
        }
    }
    return undefined;
}

function functionByNameSafe(program: HastProgram, name: string): Function {
    const func = functionByName(program, name);
    if (func == undefined) {
        throw new Error("Function not found: " + name);
    }
    return func;
}

function parseFileStart(program: HastProgram) {
    for (let i = 0; i < program.startOfFile.length; i++) {
        if (isNull(program.startOfFile[i])) {
            continue;
        }
        else if (program.startOfFile[i].startsWith("*") && program.startOfFile[i].endsWith("*")) {
            continue;
        }
        else {
            throw new Error("No expression allowed in top level");
        }
    }
}

async function parse(lines: string[], program: HastProgram) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("(print)")) {
            console.log(makeText(line.substring(8), program));
        }
        else if (isNull(line)) {
            continue;
        }
        else if (line.startsWith("(run)")) {
            const command = makeText(line.substring(6), program);
            const parts = command.split(" ");
            const args = parts.slice(1);
            const commandName = parts[0];
            const process = Deno.run({cmd: [commandName, ...args]});

            const code = await process.status();
            if (!code.success) {
                throw new Error("Command failed: " + commandName);
            }
        }
        else if (line.startsWith("*") && line.endsWith("*")) {
            continue;
        }
        else {
            throw new Error("Invalid command: " + line);
        }
    }
}

function isNull(line: string): boolean {
    return line == " " || line == "\t" || line == "\n" || line == "";
}

function ParseData(lines: string[], program: HastProgram) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith("$")) {
            const dotsIndex = line.indexOf(":");
            const varName = line.substring(1, dotsIndex);
            const value = line.substring(dotsIndex + 2);
            program.variables.push({name: varName, value: makeText(value, program)});
        }
        else if (isNull(line)) {
            continue;
        }
        else if (line.startsWith("*") && line.endsWith("*")) {
            continue;
        }
        else {
            throw new Error("Only variables can be defined in the data section");
        }
    }
}

function makeText(text: string, program: HastProgram): string {
    program.variables.forEach(variable => {
        const regex = new RegExp("\\$\\(" + variable.name + "\\)", "g");
        text = text.replace(regex, variable.value);
    })
    return text;
}

export interface Variable {
    name: string;
    value: string;
}