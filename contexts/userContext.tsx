import React, { createContext, useEffect, useState } from "react";
import { User } from "@/lib/definitions";
import { getCookie } from 'cookies-next'
import { getToken } from "@/lib/utils";

export const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = getCookie("userToken")
    console.log(token)
    
    if (!token) {
      setUser(undefined);
      return;
    }

    fetch("/api/users/whoami", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setUser(undefined);
          throw new Error("Something went wrong while fetching user");
        }

        return response.json();
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setUser(undefined);
        console.error(error);
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
