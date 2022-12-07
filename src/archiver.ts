/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import * as core from '@actions/core';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export const archiveTheFiles = (
  archiveFilePath: string,
  files: string[],
): Promise<string> => {
  const promise: Promise<string> = new Promise((resolve, reject) => {
    const output = fs.createWriteStream(archiveFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });
    output.on('close', () => {
      core.info(
        `archiver has been finalized and the output file ${archiveFilePath}: ${String(
          archive.pointer(),
        )} total bytes `,
      );
      resolve(archiveFilePath);
    });
    archive.on('error', (err) => {
      throw err;
      reject(false);
    });

    archive.pipe(output);
    files.forEach((file) =>
      archive.append(fs.createReadStream(file), {
        name: path.basename(file),
      }),
    );

    archive.finalize();
  });
  return promise;
};
