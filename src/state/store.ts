import { configureStore } from "@reduxjs/toolkit";
import { announcementsApi } from "./services/announcements";

export const store = configureStore({
  reducer: {
    [announcementsApi.reducerPath]: announcementsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(announcementsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
