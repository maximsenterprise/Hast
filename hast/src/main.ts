
import { Struct } from "./language/struct.ts";
import { Compile } from "./language/compiler.ts";
import { GetHastFile } from "./utils/getHastFile.ts";

const args = Deno.args;

const file = await GetHastFile();
if (file) {
    await Deno.readTextFile(file).then((data) => {
        const program = Struct(data);
        Compile(program, args[0]);
    });
}
else {
    throw new Error("No Hast file found in current directory");
}


