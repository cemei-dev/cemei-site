"use client";

import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { UserEntity as UserDoc } from "@/common/entities/user";
import firebaseApp from "@/config/firebase";
import { errorToast, successToast } from "@/hooks/useAppToast";
import {
  deleteOwnAccount,
  logout,
  recoverPassword,
  signInWithEmailAndPasswordLocal
} from "@/store/services/auth";
import { deleteUserDoc } from "@/store/services/user";

import AuthContext from "./context";

interface Props {
  children: React.ReactNode;
}

export type UserType = UserDoc | null;

const AuthProvider = ({ children }: Props) => {
  const initialLoadingObject = {
    onAuthUserChanged: true,
    loginWithGoogle: false,
    loginWithInternalService: false,
    createUserWithInternalService: false,
    forgotPassword: false,
    updatePassword: false,
    deleteUser: false,
    logout: false
  };
  const [userUid, setUserUid] = useState<string>("");
  const [loading, setLoading] = useState(initialLoadingObject);
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading((prev) => ({ ...prev, onAuthUserChanged: true }));

      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid("");
      }
      setLoading((prev) => ({ ...prev, onAuthUserChanged: false }));
    });

    return () => unsubscribe();
  }, []);

  const loginWithInternalService = async (email: string, password: string) => {
    setLoading((prev) => ({ ...prev, loginWithInternalService: true }));
    const { error, user } = await signInWithEmailAndPasswordLocal(
      email,
      password
    );
    console.log("User logged in:", user);
    if (user) {
      successToast("Bem vindo de volta!");
      setUserUid(user.uid);
    } else {
      setUserUid("");
      errorToast(error);
    }
    setLoading((prev) => ({ ...prev, loginWithInternalService: false }));
  };

  const waitForUserSync = async () => {
    setLoading((prev) => ({ ...prev, onAuthUserChanged: true }));
    // Wait for the user to be authenticated if needed
    setLoading((prev) => ({ ...prev, onAuthUserChanged: false }));
  };

  const forgotPassword = async (email: string) => {
    setLoading((prev) => ({ ...prev, forgotPassword: true }));
    const { error } = await recoverPassword(email);
    if (error) {
      errorToast(error);
    }
    toast("Email enviado", { type: "success" });
    setLoading((prev) => ({ ...prev, forgotPassword: false }));
  };

  const deleteUser = async () => {
    setLoading((prev) => ({ ...prev, deleteUser: true }));
    // const { error } =
    await deleteOwnAccount();
    await deleteUserDoc(userUid);
    setUserUid("");
    // if (!error) {
    //   setUser(null);
    //   toast("Account deleted", { type: "success" });
    // }
    // errorToast(error);
    setLoading((prev) => ({ ...prev, deleteUser: false }));
  };

  const logoutUser = async () => {
    console.log("Logging out user");
    setLoading((prev) => ({ ...prev, logout: true }));
    router.push("/login");
    setUserUid("");
    logout();
    setLoading((prev) => ({ ...prev, logout: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        userUid,
        loading,
        forgotPassword,
        loginWithInternalService,
        logoutUser,
        setUserUid,
        deleteUser,
        waitForUserSync
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
