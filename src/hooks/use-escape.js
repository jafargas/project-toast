import React from "react";

export default function useEscape(
  callback,
  preventDefault = false,
  stopPropagation = false
) {
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.code === "Escape") {
        preventDefault && e.preventDefault();
        stopPropagation && e.stopPropagation();
        callback();
      }
    },
    [callback, preventDefault, stopPropagation]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
