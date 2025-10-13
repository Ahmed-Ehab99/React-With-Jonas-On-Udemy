import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const callBack = function (e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      };
      document.addEventListener("keydown", callBack);
      // Cleanup Function
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [action, key]
  );
}
