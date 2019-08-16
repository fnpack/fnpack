import { extract, extractBundle } from '../util/zip';
import { ls } from '../util/fileUtils'
import { resolve, extname } from 'path'
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

export async function executeLocal (zipPath: string): Promise<void> {
    const dir = await extract(zipPath);
    process.chdir(dir);
    const files = await ls(dir);
    await Promise.all(files
        .filter(file => extname(file) === '.zip')
        .map(async zipFile => {
            return extractBundle(resolve(dir, zipFile));
        }))
    // YOLO
    process.argv = [process.argv[0], 'serverless', 'offline'];
    const serverless = new Serverless();
    return serverless
        .init()
        .then(() => serverless.run())
}