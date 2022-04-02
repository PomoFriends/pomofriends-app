const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.onUserStatusChanged = functions.database
  .ref('/status/{uid}')
  .onUpdate(async (change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();

    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = db.doc(`status/${context.params.uid}`);

    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    const statusSnapshot = await change.after.ref.once('value');
    const status = statusSnapshot.val();
    functions.logger.log(status, eventStatus);
    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    // Otherwise, we convert the last_changed field to a Date
    eventStatus.last_changed = new Date(eventStatus.last_changed);

    // ... and write it to Firestore.
    return userStatusFirestoreRef.set(eventStatus);
  });

exports.onFirebaseStatusUpdate = functions.firestore
  .document('status/{userId}')
  .onUpdate(async (change, context) => {
    // Get an object representing the document
    const newValue = change.after.data();
    const state = newValue.state;
    const userId = context.params.userId;

    console.log('state: ', state);

    // get user
    return await db
      .doc(`users/${userId}`)
      .get()
      .then(async (res) => {
        const user = res.data();
        // if user is in a group
        if (user) {
          console.log('user', user.username);
          if (state === 'offline') {
            if (user.groupId) {
              const groupId = user.groupId;
              console.log('group:', groupId);

              console.log('deleting participants');
              // delete user from participants
              await db
                .doc(`participants/${groupId}/participants/${userId}`)
                .delete();

              console.log('updating groupId for the user');
              // set groupId to null
              await db.doc(`users/${userId}`).update({ groupId: null });

              console.log('removing 1 participant from the group');
              // -1 from groups participants
              await db.doc(`groups/${groupId}`).update({
                participantsCount: FieldValue.increment(-1),
              });

              console.log('getting admin');
              // Get admin of the group
              const admin = await db
                .doc(`admins/${groupId}`)
                .get()
                .then((res) => {
                  return res.data();
                });

              console.log('getting participants');
              // Get participants
              const participants = await db
                .doc(`participants/${groupId}`)
                .listCollections();

              console.log('Got participants');
              const participantIds = participants.map((doc) => doc.id);
              console.log('participants: ', participantIds);

              if (participantIds.length !== 0) {
                if (admin) {
                  // Get a random participant
                  const participantId =
                    participantIds[
                      Math.floor(Math.random() * participantIds.length)
                    ];
                  // set new admin
                  console.log('settings new admin');
                  await db
                    .doc(`admins/${groupId}`)
                    .set({ userId: participantId });
                }
              } else {
                // delete group since there is no participants
                console.log('deleting group');
                await db.doc(`groups/${groupId}`).delete();
                console.log('deleting groupControls');
                await db.doc(`groupControls/${groupId}`).delete();
                console.log('deleting groupSettings');
                await db.doc(`groupSettings/${groupId}`).delete();
                console.log('deleting groupTime');
                await db.doc(`groupTime/${groupId}`).delete();
                console.log('deleting admins');
                await db.doc(`admins/${groupId}`).delete();
                console.log('deleting participants');
                await db.doc(`participants/${groupId}`).delete();

                console.log('deleting messages');
                const messages = await db
                  .doc(`messages/${groupId}`)
                  .listCollections();

                messages.map(async (message) => {
                  const messageDocs = await message.listDocuments();
                  messageDocs.map(async (messageDoc) => {
                    await db
                      .doc(`messages/${groupId}/messages/${messageDoc.id}`)
                      .delete();
                  });
                });
                await db.doc(`messages/${groupId}`).delete();

                console.log('deleting kicked users list');
                const kickedUsers = await db
                  .doc(`kickedUsers/${groupId}`)
                  .listCollections();

                kickedUsers.map(async (kickedUser) => {
                  const kickedUsersDocs = await kickedUser.listDocuments();
                  kickedUsersDocs.map(async (kickedUsersDoc) => {
                    await db
                      .doc(
                        `kickedUsers/${groupId}/kickedUsers/${kickedUsersDoc.id}`
                      )
                      .delete();
                  });
                });
                await db.doc(`kickedUsers/${groupId}`).delete();
              }
            }
          }
        }
      });

    // if (state === 'offline') {
    //   console.log('state is offline ');
    //   // get user
    //   return await db
    //     .collection('users')
    //     .doc(userId)
    //     .get()
    //     .then(async (res) => {
    //       const user = res.data();
    //       console.log('get user: ', user);

    //       if (user) {
    //         // if user is in a group
    //         const groupId = user.groupId;
    //         if (groupId) {
    //           console.log('groupId: ', groupId);

    //           // delete user from participants
    //           await db
    //             .collection('participants')
    //             .doc(groupId)
    //             .collection('participants')
    //             .doc(userId)
    //             .delete();

    //           // set groupId to null
    //           await db
    //             .collection('users')
    //             .doc(userId)
    //             .update({ groupId: null });

    //           // -1 from groups participants
    //           await db
    //             .collection('groups')
    //             .doc(groupId)
    //             .update({
    //               participantsCount:
    //                 firebase.firestore.FieldValue.increment(-1),
    //             });

    //           // Get admin of the group
    //           const admin = await db
    //             .collection('admins')
    //             .doc(groupId)
    //             .get()
    //             .then((res) => {
    //               return res.data();
    //             });

    //           // Get participants
    //           const snapshot = await db
    //             .collection('participants')
    //             .doc(groupId)
    //             .collection('participants')
    //             .get();

    //           const participants = snapshot.docs.map((doc) => doc.data());

    //           if (participants.length !== 0) {
    //             if (admin) {
    //               // Get a random participant
    //               const participant =
    //                 participants[
    //                   Math.floor(Math.random() * participants.length)
    //                 ];
    //               // set new admin
    //               await db
    //                 .collection('admins')
    //                 .doc(groupId)
    //                 .set({ userId: participant.id });
    //             }
    //           } else {
    //             // delete group since there is no participants
    //             await db.collection('groups').doc(groupId).delete();
    //             await db.collection('groupControls').doc(groupId).delete();
    //             await db.collection('groupSettings').doc(groupId).delete();
    //             await db.collection('groupTime').doc(groupId).delete();
    //             await db.collection('admins').doc(groupId).delete();
    //             await db.collection('participants').doc(groupId).delete();
    //             db.collection('messages')
    //               .doc(groupId)
    //               .collection('messages')
    //               .onSnapshot(async (querySnapshot) => {
    //                 // get all documents from collection with id
    //                 querySnapshot.docs.map((doc) => {
    //                   doc.ref.delete();
    //                 });

    //                 await db.collection('messages').doc(groupId).delete();
    //               });
    //           }
    //         }
    //       }

    //       return;
    //     });
    // }
    console.log('state is online ');

    return;
  });
