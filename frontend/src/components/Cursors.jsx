import { useEffect, useMemo, useState } from "react";
import { useSelf } from "../libs/liveblocks";
import { useAuthStore } from "../store/useAuthStore";

export function Cursors({ yProvider }) {
  const { authUser } = useAuthStore();
  const [awarenessUsers, setAwarenessUsers] = useState([]);

  useEffect(() => {
    if (!yProvider || !authUser) return;

    console.log("Setting up cursors for user:", authUser.name);

    // Add user info to Yjs awareness
    const localUser = {
      name: authUser.name || "Anonymous",
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      picture: authUser.profilePicture || authUser.avatar,
    };

    yProvider.awareness.setLocalStateField("user", localUser);

    // On changes, update awarenessUsers
    function setUsers() {
      const users = [...yProvider.awareness.getStates()];
      console.log("Awareness users updated:", users);
      setAwarenessUsers(users);
    }

    yProvider.awareness.on("change", setUsers);
    setUsers();

    return () => {
      yProvider.awareness.off("change", setUsers);
    };
  }, [yProvider, authUser]);

  // Insert awareness info into cursors with styles
  const styleSheet = useMemo(() => {
    let cursorStyles = "";

    for (const [clientId, client] of awarenessUsers) {
      if (client?.user) {
        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId} {
            --user-color: ${client.user.color || "orangered"};
          }
          
          .yRemoteSelectionHead-${clientId}::after {
            content: "${client.user.name || "Anonymous"}";
            position: absolute;
            top: -1.4em;
            left: 0;
            background-color: var(--user-color);
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1000;
          }

          .yRemoteSelection-${clientId} {
            background-color: var(--user-color);
            opacity: 0.3;
          }

          .yRemoteSelectionHead-${clientId} {
            border-left: 2px solid var(--user-color);
            position: relative;
          }
        `;
      }
    }

    return { __html: cursorStyles };
  }, [awarenessUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
