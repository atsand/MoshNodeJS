//resolving a promise
const p = Promise.resolve({ id: 1 });
p.then((user) => console.log('user', user));

//when rejecting a promise, use an Error object
//this will include a call stack by default
const e = Promise.reject(new Error('reason for rejection...'));
e.catch((err) => console.log(err));
