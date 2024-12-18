import React from "react";
import useKeyDown from "../../hooks/use-keydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = (variant, message) => {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant,
        message,
      },
    ];
    setToasts(nextToasts);
  };

  const deleteToast = (id) => {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  };

  const handleEscape = React.useCallback((e) => setToasts([]), []);

  useKeyDown("Escape", handleEscape, {
    preventDefault: false,
    stopPropagation: false,
  });

  return (
    <ToastContext.Provider value={{ toasts, createToast, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
