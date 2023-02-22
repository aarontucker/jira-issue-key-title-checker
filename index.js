const core = require("@actions/core");
const github = require("@actions/github");

const jiraPrefixes = core.getInput("jira-prefixes");

async function run() {
    try {
        const prTitle = github.context.payload.pull_request.title;
        const prefixesArray = jiraPrefixes.split(',');
        let keyFound = false;
        prefixesArray.forEach(prefix => {
            let regex = new RegExp(`${prefix.trim()}-[0-9]+`);
            if (regex.test(prTitle)) {
                keyFound = true;
            }
        })

        if (!keyFound) {
            core.setFailed("Jira Issue Key missing in pull request title.");
            return;
        }
    } catch (error) {
        core.info(error);
    }
}

run();