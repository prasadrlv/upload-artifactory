import * as core from '@actions/core';

export const sayHello = (): string => {
  return 'Hello';
};

function run() {
  try {
    const artifactName = core.getInput('name');
    const path = core.getInput('path');
    console.log(`artifactName ${artifactName}/${path} `);
    core.info(`artifactName ${artifactName}/${path}`);
  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err.message);
    } else {
      core.setFailed(String(err));
    }
  }
}

run();
