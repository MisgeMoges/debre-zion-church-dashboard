import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { Announcement } from "@/types/annoucement";


export const announcementsApi = createApi({
  reducerPath: "announcementsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Announcement"],
  endpoints: (builder) => ({
    getAnnouncements: builder.query<Announcement[], void>({
      async queryFn() {
        try {
          const snapshot = await getDocs(collection(db, "announcements"));
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Announcement[];
          return { data };
        } catch (error) {
          return { error: error as any };
        }
      },
      providesTags: ["Announcement"],
    }),

    addAnnouncement: builder.mutation<Announcement, Partial<Announcement>>({
      async queryFn(newAnnouncement) {
        try {
          const docRef = await addDoc(collection(db, "announcements"), {
            ...newAnnouncement,
            date: new Date().toISOString(),
            author: auth.currentUser?.displayName || "Unknown",
            views: 0,
            targetCategories: newAnnouncement.targetCategories || ["clergy"],
            timestamp: serverTimestamp(),
          });
          return { data: { ...newAnnouncement, id: docRef.id } as Announcement };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: ["Announcement"],
    }),

    updateAnnouncement: builder.mutation<Announcement, Announcement>({
      async queryFn(updatedAnnouncement) {
        try {
          await updateDoc(doc(db, "announcements", updatedAnnouncement.id), {
            ...updatedAnnouncement,
          });
          return { data: updatedAnnouncement };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: ["Announcement"],
    }),

    deleteAnnouncement: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "announcements", id));
          return { data: { id } };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: ["Announcement"],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useAddAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementsApi;
