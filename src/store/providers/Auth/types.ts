"use client";

import { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  logoutUser: () => void;
  setUserUid: Dispatch<SetStateAction<string>>;
  userUid: string;
  loading: Record<string, boolean>;
  loginWithInternalService: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  deleteUser: () => void;
  waitForUserSync: () => Promise<void>;
}
