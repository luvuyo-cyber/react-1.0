import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

//saves an event in firestore
export const addEvent = async (userId, title, date) => {
  try {
    await addDoc(collection(db, "events"), {
      userId,
      title,
      date,
      createdAt: new Date(),
    });
    console.log("Event added!");
  } catch (error) {
    console.error("Error adding event: ", error.message);
  }
};

export const createUserProfile = async (uid, email) => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      email,
      createdAt: new Date(),
    });
    console.log("User profile created");
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    console.log("Event Deleted");
  } catch (error) {
    console.error("Error deleting event: ", error.message);
  }
};

export const updateEvent = async (eventId, updatedData) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, updatedData);
    console.log("Event updated!");
  } catch (error) {
    console.error("Error updating event: ", error.message);
  }
};

//fetches events that belong to a specific user
export const getUserEvents = async (userId) => {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
