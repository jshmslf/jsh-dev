"use client";

import { useState } from "react";

export function useContact() {
  const [open, setOpen] = useState(false);
  return { open, openContact: () => setOpen(true), closeContact: () => setOpen(false) };
}
