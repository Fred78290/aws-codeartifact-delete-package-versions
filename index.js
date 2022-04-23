const core = require('@actions/core');
const codeArtifact = require('@aws-sdk/client-codeartifact');

async function run() {
  const region = core.getInput('region', { required: true });
  const domain = core.getInput('domain', { required: true });
  const account = core.getInput('domain-owner', { required: true });
  const repo = core.getInput('repository', { required: true });
  const format = core.getInput('format', { required: true });
  const namespace = core.getInput('namespace', { required: true });
  const pkg = core.getInput('package', { required: true });
  const versions = core.getMultilineInput('versions', { required: true });
 
  const client = new codeArtifact.CodeartifactClient({ region: region });
  const authCommand = new codeArtifact.DeletePackageVersionsCommand({
    domain: domain,
    domainOwner: account,
    repository: repo,
    format: format,
    package: pkg,
    versions: versions,
    namespace: namespace
  });

  const response = await client.send(authCommand);

  if (response.failedVersions != undefined) {
     core.setOutput('failedVersions', response.failedVersions);
  }

  if (response.successfulVersions != undefined) {
   core.setOutput('successfulVersions', response.successfulVersions);
  }
}

module.exports = run;

if (require.main === module) {
    run();
}
