export enum Inputs {
  Name = 'name',
  Path = 'path',
  IfNoFilesFound = 'if-no-files-found',
  ArtifactoryUrl = 'artifactoryUrl',
  ArtifactoryKey = 'artifactoryKey',
  RetentionDays = 'retentionDays',
}

export enum NoFileOptions {
  /**
   * Default. Output a warning but do not fail the action
   */
  warn = 'warn',

  /**
   * Fail the action with an error message
   */
  error = 'error',

  /**
   * Do not output any warnings or errors, the action does not fail
   */
  ignore = 'ignore',
}

export interface UploadInputs {
  /**
   * The name of the artifact that will be uploaded
   */
  artifactName: string;

  /**
   * The search path used to describe what to upload as part of the artifact
   */
  searchPath: string;

  /**
   * The desired behavior if no files are found with the provided search path
   */
  ifNoFilesFound: NoFileOptions;

  /**
   * Duration after which artifact will expire in days
   */
  retentionDays: number;

  /**
   * The URL for your Artifactory instance
   */
  artifactoryUrl: string;

  /**
   * The Artifactory API key
   */
  artifactoryKey: string;
}
