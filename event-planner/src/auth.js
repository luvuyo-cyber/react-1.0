import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up!");
  } catch (error) {
    console.error("Error signing up: ", error.message);
  }
};

export const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in!");
  } catch (error) {
    console.error("Error logging in: ", error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out!");
  } catch (error) {
    console.error("Error logging out: ", error.message);
  }
};
