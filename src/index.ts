import * as core from '@actions/core';
import { getInputs } from './inputs';
import { findFilesToUpload } from './files';
import { uploadArtifactory } from './artifactory';
import { archiveTheFiles } from './archiver';
import { NoFileOptions } from './model';
export const sayHello = (): string => {
  return 'Hello';
};

async function run(): Promise<void> {
  try {
    const inputs = getInputs();
    const searchResult = await findFilesToUpload(inputs.searchPath);
    console.log('searchResult', searchResult?.filesToUpload);

    if (searchResult?.filesToUpload?.length === 0) {
      const message = `No files were found with the provided path: ${inputs.searchPath}. No artifacts will be uploaded.`;
      switch (inputs.ifNoFilesFound) {
        case NoFileOptions.warn: {
          core.warning(message);
          break;
        }
        case NoFileOptions.error: {
          core.setFailed(message);
          break;
        }
        case NoFileOptions.ignore: {
          core.info(message);
          break;
        }
      }
    } else {
      if (inputs.artifactoryUrl) {
        core.info(
          `With the provided path, there will be ${searchResult?.filesToUpload?.length} file(s) uploaded`,
        );
        const archivedFilePath = `${__dirname}/${inputs.artifactName}`;

        await archiveTheFiles(archivedFilePath, searchResult?.filesToUpload);
        console.log('archivedFilePath ', archivedFilePath);
        await uploadArtifactory(
          inputs.artifactoryUrl,
          inputs.artifactoryKey,
          archivedFilePath,
        );
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err.message);
    } else {
      core.setFailed(String(err));
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
