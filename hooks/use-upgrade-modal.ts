"use client";
import { parseAsBoolean, useQueryState } from "nuqs";

export const useUpgradeModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "upgrade",
    parseAsBoolean.withDefault(false)
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
