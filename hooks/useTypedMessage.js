import { useEffect, useState } from "react";
import { wait } from "@shared/helpers";

export default function useTypedMessage(message) {
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    let canceled = false;

    async function typeMessage() {
      setTypedMessage("");
      if (message.length) {
        let visibleMessage = "";
        for (let i = 0; i < message.length; i++) {
          if (canceled) return;
          await wait(25);
          visibleMessage = visibleMessage + message[i];
          setTypedMessage(visibleMessage);
        }
      }
    }

    typeMessage();

    return () => {
      canceled = true;
    };
  }, [message]);

  return typedMessage;
}
