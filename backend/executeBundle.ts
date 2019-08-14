import { extract } from '../util/zip';
const Serverless = require("../node_modules/serverless/lib/Serverless")

export async function execute (zipPath: string): Promise<void> {
    const dir = await extract(zipPath);
    process.chdir(dir);
    // YOLO
    process.argv = [process.argv[0], 'serverless', 'deploy'];
    const serverless = new Serverless();
    return serverless
        .init()
        .then(() => serverless.run())
}

