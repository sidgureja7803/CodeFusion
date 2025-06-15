import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylist: null,
  isLoading: false,
  error: null,

  createPlaylist: async (playlistData) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        "/playlist/create-playlist",
        playlistData
      );

      set((state) => ({
        playlists: [...state.playlists, response.data.playlist],
      }));

      Toast.success("Playlist created successfully");
      return response.data.playlist;
    } catch (error) {
      console.error("Error creating playlist:", error);
      Toast.error(error.response?.data?.error || "Failed to create playlist");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllPlaylists: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/playlist");
      set({ playlists: response.data.playlists });
    } catch (error) {
      console.error("Error fetching playlists:", error);
      Toast.error("Failed to fetch playlists");
    } finally {
      set({ isLoading: false });
    }
  },

  getPlaylistDetails: async (playlistId) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(`/playlist/${playlistId}`);
      set({ currentPlaylist: response.data.playlist });
    } catch (error) {
      console.error("Error fetching playlist details:", error);
      Toast.error("Failed to fetch playlist details");
    } finally {
      set({ isLoading: false });
    }
  },

  updatePlaylist: async (playlistId, updateData) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.patch(
        `/playlist/${playlistId}`,
        updateData
      );

      // Update the playlist in the state
      set((state) => ({
        playlists: state.playlists.map((playlist) =>
          playlist.id === playlistId ? response.data.playlist : playlist
        ),
        // If this is the current playlist being viewed, update it too
        currentPlaylist:
          state.currentPlaylist?.id === playlistId
            ? response.data.playlist
            : state.currentPlaylist,
      }));

      Toast.success("Playlist updated successfully");
      return response.data.playlist;
    } catch (error) {
      console.error("Error updating playlist:", error);

      // Handle specific errors
      if (error.response?.status === 400) {
        Toast.error(error.response.data.message || "Failed to update playlist");
      } else {
        Toast.error("Failed to update playlist");
      }

      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addProblemToPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      await axiosInstance.post(`/playlist/${playlistId}/add-problem`, {
        problemIds,
      });

      Toast.success("Problem added to playlist");

      // Refresh the playlist details
      if (get().currentPlaylist?.id === playlistId) {
        await get().getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error("Error adding problem to playlist:", error);
      Toast.error("Failed to add problem to playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  removeProblemFromPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      await axiosInstance.post(`/playlist/${playlistId}/remove-problem`, {
        problemIds,
      });

      Toast.success("Problem removed from playlist");

      // Refresh the playlist details
      if (get().currentPlaylist?.id === playlistId) {
        await get().getPlaylistDetails(playlistId);
      }
    } catch (error) {
      console.error("Error removing problem from playlist:", error);
      Toast.error("Failed to remove problem from playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/playlist/${playlistId}/delete-playlist`);

      set((state) => ({
        playlists: state.playlists.filter((p) => p.id !== playlistId),
      }));

      Toast.success("Playlist deleted successfully");
    } catch (error) {
      console.error("Error deleting playlist:", error);
      Toast.error("Failed to delete playlist");
    } finally {
      set({ isLoading: false });
    }
  },
}));
