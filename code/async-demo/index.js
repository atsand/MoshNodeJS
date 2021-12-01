console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUserName, (repos) => {
    console.log('Repositories', repos);
  });
});
console.log('After');

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
