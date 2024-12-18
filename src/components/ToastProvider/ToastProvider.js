import React from "react";
import useEscape from "../../hooks/use-escape";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const insertToast = (id, variant, message) => {
    const newToasts = toasts.map((t) => {
      return { ...t };
    });
    newToasts.push({
      id,
      variant,
      message,
    });
    setToasts(newToasts);
  };

  const deleteToast = (id) => {
    const newToasts = [];
    toasts.forEach((t) => {
      if (t.id !== id) {
        newToasts.push({ ...t });
      }
    });
    setToasts(newToasts);
  };

  useEscape(() => setToasts([]), true, true);

  return (
    <ToastContext.Provider value={{ toasts, insertToast, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
