import React from "react";
import { notificationStore } from "../state/store";

const Notification = () => {
  const removeNotifications = notificationStore(
    (state) => state.removeNotifications
  );
  const notifications = notificationStore((state) => state.notifications);

  if (notifications.length > 0) setTimeout(() => removeNotifications(), 3000);
  /*eslint-disable eqeqeq*/
  return (
    <>
      <>
        {Object.keys(notifications[0]) == "error" ? (
          <>
            <div className="notification is-danger p-3 has-text-weight-bold">
              {notifications[0].error}
            </div>
          </>
        ) : (
          <></>
        )}

        {Object.keys(notifications[0]) == "message" ? (
          <>
            <div className="notification is-success p-3 has-text-weight-bold">
              {notifications[0].message}
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default Notification;
