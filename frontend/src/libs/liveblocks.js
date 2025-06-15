import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  // authEndpoint: "http://localhost:3000/api/v1/liveblocks/auth",
  // Or use a public key for development
  publicApiKey:
    "pk_dev_kqoJB2oLs3b3ii3yNK20J958LiOGgRZrl7wP4aldo3IeP31fRVE22vkYw0JYluaS",
});

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useOthers,
  useSelf,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useHistory,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
  useBroadcastEvent,
  useEventListener,
} = createRoomContext(client);
