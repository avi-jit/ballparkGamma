importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCtYDpISyqKeI5UAAjZlkf49tU8RL8fFXk",
    authDomain: "ballpark-gamma.firebaseapp.com",
    projectId: "ballpark-gamma",
    storageBucket: "ballpark-gamma.appspot.com",
    messagingSenderId: "672170777780",
    appId: "1:672170777780:web:266de06308a77ce10fcbe1",
    measurementId: "G-FXNLPEN4T0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  // Customize the notification payload and display it
  const notificationOptions = {
    body: payload.notification.body,
  };

  event.waitUntil(self.registration.showNotification(payload.notification.title, notificationOptions));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Customize the notification click behavior
  // For example, you can redirect the user to a specific page
});
