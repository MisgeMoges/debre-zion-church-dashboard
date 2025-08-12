import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const firestore = getFirestore();

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isClergy, setIsClergy] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch user profile document
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const categories: string[] = data.memberCategory || [];
          setIsClergy(categories.includes("Clergy"));
        } else {
          setIsClergy(false);
        }
      } else {
        setIsClergy(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!isClergy) {
    // Logged in but not clergy category
    return <div>Access Denied: You do not have permission to view this page.</div>;
  }

  return <>{children}</>;
}
