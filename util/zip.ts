import * as Zip from 'adm-zip'
import { resolve } from 'path'
import { lstat, readdir } from 'fs-extra'

//Note: if argument is a directory it will NOT include child directories!
//this method is janky and lazy as hell--don't use it
export async function zip (path: string, fileName: string): Promise<string> {
    const zip = new Zip();
    const isDirectory = (await lstat(path)).isDirectory();
    let newPath;
    if(isDirectory) {
        (await readdir(path))
            .forEach(file => {
                zip.addLocalFile(resolve(path, file));
            });
        
    } else {
        zip.addLocalFile(path);
    }
    const pathTokens = path.split('/');
    pathTokens[pathTokens.length - 1] = fileName;
    newPath = pathTokens.join('/');
    zip.writeZip(newPath);
    return newPath;
    
}

export async function extract (path: string): Promise<string> {
    const zip  = new Zip(path);
    const zipName = path.replace('.zip', '/');
    zip.extractAllTo(zipName, true);
    return zipName;
}
