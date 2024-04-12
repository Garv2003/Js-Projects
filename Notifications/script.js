const button = document.querySelector("button");

button.addEventListener("click", () => {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      const notification = new Notification("Hello, world!", {
        body: "This is a notification from the Notifications API",
        data: {
          hello: "world",
        },
        icon: "https://picsum.photos/200/300",
        tag: "welcome",
      });
      notification.addEventListener("error", (err) => {
        console.error(err);
        alert("An error occurred while trying to display the notification");
      });
    }
  });
});

// let notification;
// let interval;

// document.addEventListener("visibilitychange", () => {
//   if (document.visibilityState === "visible") {
//     const leaveDate = new Date();
//     interval = setInterval(() => {
//       const now = new Date();
//       const diff = now - leaveDate;
//       notification = new Notification("You've been away!", {
//         body: `You've been away for ${Math.round(diff / 1000)} seconds`,
//       });
//     }, 5000);
//   } else {
//     if (notification) {
//       notification.close();
//     }
//     if (interval) {
//       clearInterval(interval);
//     }
//   }
// });
