import React from "react";

export default function useKeyDown(keyCode, callback, options = {}) {
  const codes = React.useMemo(() => {
    const temp = [];
    if (typeof keyCode === "string") {
      temp.push(keyCode);
    } else if (Array.isArray(keyCode)) {
      temp.push(...keyCode);
    } else {
      throw new Error("keyCode must be a string or an array");
    }
    return temp;
  }, [keyCode]);

  const internalOptions = React.useMemo(() => {
    return {
      crtlKey: undefined,
      shiftKey: undefined,
      metaKey: undefined,
      preventDefault: false,
      stopPropagation: false,
      ...options,
    };
  }, [options]);

  const handleKeyDown = React.useCallback(
    (e) => {
      if (codes.find((v) => v === e.code)) {
        if (
          internalOptions.crtlKey === undefined ||
          internalOptions.crtlKey === e.crtlKey
        ) {
          if (
            internalOptions.shiftKey === undefined ||
            internalOptions.shiftKey === e.shiftKey
          ) {
            if (
              internalOptions.metaKey === undefined ||
              internalOptions.metaKey === e.metaKey
            ) {
              internalOptions.preventDefault && e.preventDefault();
              internalOptions.stopPropagation && e.stopPropagation();
              callback(e);
            }
          }
        }
      }
    },
    [codes, callback, internalOptions]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
