import type { SnowpackConfig } from "snowpack";
import { inlineScriptTags, inlineImages, inlineStylesheets } from "inline-scripts";
import { promises as fs } from "fs";

export type PluginOptions = {
    inlineScripts: boolean,
    inlineStylesheets: boolean,
    inlineImages: boolean,
    entryFile?: string
};

module.exports = function(_snowpackConfig: SnowpackConfig, pluginOptions: PluginOptions) {
    let file = pluginOptions.entryFile || "index.html";
    return {
        name: 'snowpack-inline-scripts',
        async optimize({ buildDirectory }) {
            let path = buildDirectory + "/" + file;
            await fs.writeFile(path, await inlineScriptTags(path));
            await fs.writeFile(path, await inlineStylesheets(path));
            await fs.writeFile(path, await inlineImages(path));
        },
    };
};
