import { createContext } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContexProvider({ children }) {
  return (
    <NotificationContext.Provider>{children}</NotificationContext.Provider>
  );
}

export default NotificationContext;
