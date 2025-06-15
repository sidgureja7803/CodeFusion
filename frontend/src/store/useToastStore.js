import { create } from "zustand";

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Date.now();
    const newToast = {
      id,
      title: toast.title,
      message: toast.message,
      type: toast.type || "info", // 'success', 'error', 'info', 'warning'
      duration: toast.duration || 5000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Remove toast after duration
    setTimeout(() => {
      get().removeToast(id);
    }, toast.duration || 5000);

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export const Toast = {
  success: (message, title, duration) =>
    useToastStore
      .getState()
      .addToast({ message, title, type: "success", duration }),
  error: (message, title, duration) =>
    useToastStore
      .getState()
      .addToast({ message, title, type: "error", duration }),
  warning: (message, title, duration) =>
    useToastStore
      .getState()
      .addToast({ message, title, type: "warning", duration }),
  info: (message, title, duration) =>
    useToastStore
      .getState()
      .addToast({ message, title, type: "info", duration }),
};
