import { useState, useEffect } from "react";

/* eslint-disable react-hooks/exhaustive-deps */

export default function useAsyncEffect(effect, deps) {
  const setState = useState()[1];

  return useEffect(() => {
    async function safeRunner() {
      try {
        await effect();
      } catch (e) {
        setState(() => {
          throw e;
        });
      }
    }

    safeRunner();
  }, deps);
}
/* eslint-enable react-hooks/exhaustive-deps */
