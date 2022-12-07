import * as core from '@actions/core';
import { Inputs, NoFileOptions, UploadInputs } from './model';

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): UploadInputs {
  const name = core.getInput(Inputs.Name);
  const path = core.getInput(Inputs.Path, { required: true });

  const artifactoryUrl = core.getInput(Inputs.ArtifactoryUrl);
  const artifactoryKey = core.getInput(Inputs.ArtifactoryKey);

  const ifNoFilesFound = core.getInput(Inputs.IfNoFilesFound);
  const noFileBehavior: NoFileOptions = NoFileOptions[
    ifNoFilesFound
  ] as NoFileOptions;

  if (!noFileBehavior) {
    core.setFailed(
      `Unrecognized ${
        Inputs.IfNoFilesFound
      } input. Provided: ${ifNoFilesFound}. Available options: ${JSON.stringify(
        Object.keys(NoFileOptions),
      )}`,
    );
  }

  const inputs = {
    artifactName: name,
    searchPath: path,
    ifNoFilesFound: noFileBehavior,
    artifactoryUrl,
    artifactoryKey,
  } as UploadInputs;

  const retentionDaysStr = core.getInput(Inputs.RetentionDays);
  if (retentionDaysStr) {
    inputs.retentionDays = parseInt(retentionDaysStr);
    if (isNaN(inputs.retentionDays)) {
      core.setFailed('Invalid retention-days');
    }
  }

  return inputs;
}
