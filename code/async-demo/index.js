console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUserName, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

getUser(1)
  .then((user) => getRepositories(user.gitHubUserName))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log('Commits', commits))
  .catch((err) => console.log('Error', err.message));

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting user from db...');
      resolve({ id: id, gitHubUserName: 'Aaron' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting repositories from gitHub...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting commits from gitHub...');
      resolve(['commit1', 'commit2', 'commit3']);
    }, 2000);
  });
}
