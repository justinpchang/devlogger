import { useSignOut } from "@/hooks/useSignOut";
import { useEffect } from "react";

export default function SignOut() {
  const { mutate: signOut } = useSignOut();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return null;
}
