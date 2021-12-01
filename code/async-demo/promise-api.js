// //resolving a promise
// const p = Promise.resolve({ id: 1 });
// p.then((user) => console.log('user', user));

// //when rejecting a promise, use an Error object
// //this will include a call stack by default
// const e = Promise.reject(new Error('reason for rejection...'));
// e.catch((err) => console.log(err));

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('async function 1');
//     reject(new Error('something broke'));
//   }, 2000);
// });

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('async function 2');
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('async function 3');
    resolve(3);
  }, 2000);
});

// //use Promise.all to pass an array of promises
// //once all resolve it will return the results in an array
// //if any fail, all are considered failed
// Promise.all([p1, p2])
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// use Promise.race to pass an array of promises
// once any return a result, it will return that result
Promise.race([p2, p3])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
