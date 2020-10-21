const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

try {
    const incoming_owner = github.context.payload.pull_request.head.repo.owner.login;
    const incoming_branch = github.context.payload.pull_request.head.ref;
    const incoming_repo = github.context.payload.pull_request.head.repo.clone_url;
    const execSync = exec.execSync;
    execSync("cd $GITHUB_WORKSPACE");
    console.log(`git checkout -b ${incoming_owner}-${incoming_branch} $GITHUB_BASE_REF`);
    console.log(execSync(`git checkout -b ${incoming_owner}-${incoming_branch} $GITHUB_BASE_REF`));
    console.log(`git pull ${incoming_repo} ${incoming_branch}`);
    console.log(execSync(`git pull ${incoming_repo} ${incoming_branch}`));
} catch (error) {
    core.setFailed(error.message);
}