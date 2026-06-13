"use client";

import { useEffect, useState } from "react";

export type ChakraUser = {
  name: string;
  handle: string;
  avatar: string;
  platform: string;
  followers: string;
  following: string;
  posts: string;
  engagement: string;
  avgLikes: string;
  avgComments: string;
  avgViews: string;
  niche: string;
  bio: string;
  verified: boolean;
};

export function useUser(): ChakraUser | null {
  const [user, setUser] = useState<ChakraUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("chakra_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  return user;
}
