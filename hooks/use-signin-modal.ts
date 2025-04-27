"use client";
import { parseAsBoolean, useQueryState } from "nuqs";

export const useSignInModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "signin",
    parseAsBoolean.withDefault(false)
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
