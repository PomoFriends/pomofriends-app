// import * as functions from 'firebase-functions';

export const randomFunction = () => {
  console.log('yo');
};

// exports.makeUppercase = functions.database
//   .ref('/participants/{pushId}/participants')
//   .onUpdate((snapshot, context) => {
//     Grab the current value of what was written to the Realtime Database.
//     const original = snapshot.before
//     functions.logger.log('Uppercasing', context.params.pushId, original);
//     const uppercase = original.toUpperCase();
//     You must return a Promise when performing asynchronous tasks inside a Functions such as
//     writing to the Firebase Realtime Database.
//     Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return snapshot.ref.parent.child('uppercase').set(uppercase);

//     console.log(snapshot.before);
//   });
