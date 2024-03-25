
export async function GetHastFile(): Promise<string> {
    const currentDir = ".";
    for await (const dirEntry of Deno.readDir(currentDir)) {
        if (dirEntry.isFile && (dirEntry.name === "Hastentry" || dirEntry.name.endsWith(".hast"))) {
            return dirEntry.name;
        }
    }   
    throw new Error("No Hast file found in current directory")
}