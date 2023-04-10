import * as core from '@actions/core'
import { isNewerVersion } from './version';


async function run(): Promise<void> {
  try {
    const before: string = core.getInput('before', { required: true });
    const after: string = core.getInput('after', { required: true });
    const releaseType: string = core.getInput('release_type', { required: true });
    core.setOutput('newer', isNewerVersion(before, after, releaseType));
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
