console.log('Before');
getUser(1, getRepositoriesByUser);
console.log('After');

function getRepositoriesByUser(user) {
  getRepositories(user.gitHubUserName, getCommitsForRepo);
}

function getCommitsForRepo(repos) {
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Getting user from db...');
    callback({ id: id, gitHubUserName: 'Aaron' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Getting repositories from gitHub...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Getting commits for repo...');
    callback(['commit1', 'commit2', 'commit4']);
  }, 2000);
}
