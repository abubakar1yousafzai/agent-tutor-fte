// lib/session.ts — minimal session: the user_id (and a cached user object) live
// in localStorage. No auth provider/context — just helpers the client pages read.
// Set on login (POST /users), cleared on logout.

import type { User } from "./api";

const ID_KEY = "agenttutor.userId";
const USER_KEY = "agenttutor.user";

export function setSession(user: User) {
  localStorage.setItem(ID_KEY, user.id);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ID_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(ID_KEY);
  localStorage.removeItem(USER_KEY);
}

export const isPremium = (user: User | null) => user?.tier === "premium";
