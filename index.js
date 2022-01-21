const core = require('@actions/core');
const github = require('@actions/github');

const main = async() => {
    try {
        const repository = core.getInput('repository', {required: true});
        const environment = core.getInput('environment', {required: true});
        const token = process.env.GITHUB_TOKEN;
        const octokit = new github.getOctokit(token);

        const { data: deployments } = await octokit.rest.repos.listDeployments({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            environment,
        });

        console.log(deployments);
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
