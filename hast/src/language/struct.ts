
import { Variable } from "./compiler.ts";

export function Struct(src: string): HastProgram {
    const data: string[] = [];
    const run: string[] = [];
    const main: string[] = [];
    const clear: string[] = [];
    const other: Function[] = [];
    const startOfFile: string[] = [];
    let currentParsingFunction: Function = {name: "", body: []};
    let currentSite = Sites.None;
    const lines: string[] = src.split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (currentSite == Sites.None) {
            if (lines[i].includes("hast-main")) {
                if (main.length != 0) {
                    throw new Error("Main already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Main;
                }
            }
            else if (lines[i].includes("hast-data")) {
                if (data.length != 0) {
                    throw new Error("Data already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Data;
                }
            }
            else if (lines[i].startsWith("hast-")) {
                currentSite = Sites.Other;
                currentParsingFunction = {name: lines[i].split("hast-")[1], body: []};
                continue;
            }
            else {
                startOfFile.push(lines[i]);
            }
        }
        else if (currentSite == Sites.Data) {
            if (lines[i].includes("hast-run")) {
                if (run.length != 0) {
                    throw new Error("Run already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Run;
                }
            }
            else if (lines[i].includes("hast-clear")) {
                if (clear.length != 0) {
                    throw new Error("Clear already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Clear;
                }
            }
            else if (lines[i].includes("hast-main")) {
                if (main.length != 0) {
                    throw new Error("Main already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Main;
                }
            }
            else if (lines[i].startsWith("hast-")) {
                currentSite = Sites.Other;
                currentParsingFunction = {name: lines[i].split("hast-")[1], body: []};
                continue;
            }
            else {
                data.push(lines[i]);
            }
        } 
        else if (currentSite == Sites.Other) {
            if (lines[i].includes("hast-clear")) {
                if (clear.length != 0) {
                    throw new Error("Clear already exists and cannot be redeclared");
                }
                else {
                    other.push(currentParsingFunction);
                    currentParsingFunction = {name: "", body: []};
                    currentSite = Sites.Clear;
                }
            }
            else if (lines[i].includes("hast-main")) {
                if (main.length != 0) {
                    throw new Error("Main already exists and cannot be redeclared");
                }
                else {
                    other.push(currentParsingFunction);
                    currentParsingFunction = {name: "", body: []};
                    currentSite = Sites.Main;
                }
            }
            else if (lines[i].includes("hast-data")) {
                if (data.length != 0) {
                    throw new Error("Data already exists and cannot be redeclared");
                }
                else {
                    other.push(currentParsingFunction);
                    currentParsingFunction = {name: "", body: []};
                    currentSite = Sites.Data;
                }
            }
            else if (lines[i].includes("hast-run")) {
                if (run.length != 0) {
                    throw new Error("Run already exists and cannot be redeclared");
                }
                else {
                    other.push(currentParsingFunction);
                    currentParsingFunction = {name: "", body: []};
                    currentSite = Sites.Run;
                }
            }
            else if (lines[i].startsWith("hast-")) {
                if (currentParsingFunction) {
                    other.push(currentParsingFunction);
                }
                currentParsingFunction = {name: lines[i].split("hast-")[1], body: []};
            }
            else {
                currentParsingFunction.body.push(lines[i]);
            }
        }
        else if (currentSite == Sites.Run) {
            if (lines[i].includes("hast-clear")) {
                if (clear.length != 0) {
                    throw new Error("Clear already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Clear;
                }
            }
            else if (lines[i].includes("hast-main")) {
                if (main.length != 0) {
                    throw new Error("Main already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Main;
                }
            }
            else if (lines[i].includes("hast-data")) {
                if (data.length != 0) {
                    throw new Error("Data already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Data;
                }
            }
            else if (lines[i].startsWith("hast-")) {
                currentSite = Sites.Other;
                currentParsingFunction = {name: lines[i].split("hast-")[1], body: []};
                continue;
            }
            else {
                run.push(lines[i]);
            }
        }
        else if (currentSite == Sites.Main) {
            if (lines[i].includes("hast-data")) {
                if (data.length != 0) {
                    throw new Error("Data already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Data;
                }
            }
            else if (lines[i].includes("hast-clear")) {
                if (clear.length != 0) {
                    throw new Error("Clear already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Clear;
                }
            }
            else if (lines[i].includes("hast-run")) {
                if (run.length != 0) {
                    throw new Error("Run already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Run;
                }
            }
            else if (lines[i].startsWith("hast-")) {
                currentSite = Sites.Other;
                currentParsingFunction = {name: lines[i].split("hast-")[1], body: []};
                continue;
            }
            else {
                main.push(lines[i]);
            }
        }
        else if (currentSite == Sites.Clear) {
            if (lines[i].includes("hast-main")) {
                if (main.length != 0) {
                    throw new Error("Main already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Main;
                }
            }
            else if (lines[i].includes("hast-data")) {
                if (data.length != 0) {
                    throw new Error("Data already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Data;
                }
            }
            else if (lines[i].includes("hast-run")) {
                if (run.length != 0) {
                    throw new Error("Run already exists and cannot be redeclared");
                }
                else {
                    currentSite = Sites.Run;
                }
            }
            else if (lines[i].startsWith("hast-")) {
                currentSite = Sites.Other;
                currentParsingFunction = {name: lines[i].split("hast-")[1], body: []};
                continue;
            }
            else {
                clear.push(lines[i]);
            }
        }
        else {
            throw new Error("Invalid state");
        }
    }
    const empty: string[] = [];
    if (currentParsingFunction.body != empty && currentParsingFunction.name != "") {
        other.push(currentParsingFunction);
    }
    const returnVal: HastProgram = {data, run, main, clear, startOfFile, privateFunctions: other, variables: []};
    return returnVal;
}

export enum Sites {
    Data,
    Run,
    Main,
    Clear,
    None,
    Other,
}

export interface HastProgram {
    data: string[];
    run: string[];
    main: string[];
    clear: string[];
    startOfFile: string[];
    privateFunctions: Function[];
    variables: Variable[];
}

export interface Function {
    name: string;
    body: string[];
}