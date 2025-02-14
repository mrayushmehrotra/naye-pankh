"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  email: string;
  picture: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("googleToken");
    if (token) {
      const decodedUser: User = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  return { user };
};
