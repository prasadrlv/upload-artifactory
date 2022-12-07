/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as core from '@actions/core';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import FormData = require('form-data');

export const uploadArtifactory = async (
  url: string,
  token: string,
  filePath: string,
) => {
  try {
    const formData = new FormData();
    const basename = path.basename(filePath);

    formData.append(basename, fs.readFileSync(filePath));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const response = await fetch(path.join(url, basename), {
      method: 'PUT',
      body: formData,
      headers: {
        'X-JFrog-Art-Api': token,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const result = await response.json();
    core.info(`Upload Details: ${JSON.stringify(result)}`);
  } catch (error) {
    core.error(`Error uploading file to artifactory: ${filePath}`);
    core.setFailed(String(error));
  }
};
