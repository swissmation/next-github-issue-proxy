const { Octokit } = require("@octokit/rest");

export const fetchIssues = async () => {
  try {
    const authToken = process.env.GIT_AUTH_TOK
    const octokit = new Octokit({
      auth: authToken
    });

    const owner = process.env.GIT_USER_NAME;
    const repo = process.env.GIT_REPO_NAME

    // octokit.request
    // https://octokit.github.io/rest.js/v18#issues-list-for-repo
    // const url = `/${owner}/${repo}/issues`
    // const issues = await octokit.request(url);
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
    });

    const data = issues?.map(issue => {
      return { number: issue.number, url: issue.url, title: issue.title, body: issue.body, updated_at: issue.updated_at }
    })

    return data
  } catch (error) {
    console.error(error.message);
    return null
  }
}
