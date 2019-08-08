import { bundle } from "./fnpack.config";
import { compile } from "./core/compiler";

async function x (): Promise<void> {
    await compile(bundle);
}

x();
