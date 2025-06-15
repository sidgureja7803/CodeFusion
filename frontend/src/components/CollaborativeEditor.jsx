import React, { useEffect, useRef, useCallback, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useRoom, useOthers } from "../libs/liveblocks.js";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { UserAvatar } from "./UserAvatar";
import { useAuthStore } from "../store/useAuthStore";
import { Cursors } from "./Cursors";
import Toolbar from "./Toolbar";

const CollaborativeEditor = ({
  language = "javascript",
  theme = "vs-dark",
  value = "",
  onChange,
  height = "100%",
  roomId,
}) => {
  const { authUser } = useAuthStore();
  const room = useRoom();
  const others = useOthers();
  const [editorRef, setEditorRef] = useState(null);
  const bindingRef = useRef(null);
  const initValueRef = useRef(value); // Store the initial value
  const roomInitialized = useRef(new Set()); // Track which rooms we've initialized

  // Get Yjs provider for the room
  const provider = room ? getYjsProviderForRoom(room) : null;

  // useEffect(() => {
  //   console.log("Room:", room);
  //   console.log("Provider:", provider);
  //   console.log("Editor:", editorRef);
  //   console.log("Others:", others);
  // }, [room, provider, editorRef, others]);

  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    let binding;

    if (editorRef && provider) {
      const yDoc = provider.getYDoc();
      const yText = yDoc.getText("monaco");
      const currentRoomId = room?.id;

      console.log("Current Yjs text content:", yText.toString());
      console.log("Initial value ref:", initValueRef.current);
      console.log(
        "Room initialized for:",
        currentRoomId,
        roomInitialized.current.has(currentRoomId)
      );

      // Only set initial value if:
      // 1. The document is empty
      // 2. We haven't initialized this room before
      // 3. We have an initial value to set
      if (
        yText.toString() === "" &&
        !roomInitialized.current.has(currentRoomId) &&
        initValueRef.current &&
        initValueRef.current.trim() !== ""
      ) {
        console.log(
          "Setting initial value in Yjs document for room:",
          currentRoomId
        );
        yText.insert(0, initValueRef.current);
        roomInitialized.current.add(currentRoomId);
      }

      // Attach Yjs to Monaco
      binding = new MonacoBinding(
        yText,
        editorRef.getModel(),
        new Set([editorRef]),
        provider.awareness
      );

      bindingRef.current = binding;

      // Handle content changes for parent component
      if (onChange) {
        const handleChange = () => {
          const currentContent = yText.toString();
          onChange(currentContent);
        };
        yText.observe(handleChange);

        return () => {
          yText.unobserve(handleChange);
          binding?.destroy();
        };
      }
    }

    return () => {
      binding?.destroy();
    };
  }, [editorRef, provider, room?.id]);

  useEffect(() => {
    if (!provider) {
      initValueRef.current = value;
    }
  }, [value, provider]);

  // Handle editor mount
  const handleOnMount = useCallback((editor) => {
    setEditorRef(editor);
  }, []);

  return (
    <div className="collaborative-editor-container relative">
      {/* Live cursors */}
      {provider && <Cursors yProvider={provider} />}
      {editorRef && <Toolbar editor={editorRef} />}

      {/* Editor */}
      <div className="h-full w-full">
        <Editor
          height={height}
          language={language.toLowerCase()}
          theme={theme}
          onMount={handleOnMount}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            lineNumbers: "on",
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 20 },
          }}
        />
      </div>

      {/* Active users indicator */}
      <div className="active-users-container absolute top-2 right-2 flex space-x-1">
        {others.map((user) => (
          <UserAvatar
            key={user.connectionId}
            name={user.info?.name || "Anonymous"}
            avatar={user.info?.picture}
            color={user.info?.color}
          />
        ))}
        {/* Current user */}
        {authUser && (
          <UserAvatar
            name={`${authUser.name}`}
            avatar={authUser.profilePicture}
            color="#4ECDC4"
          />
        )}
      </div>
    </div>
  );
};

export default CollaborativeEditor;
