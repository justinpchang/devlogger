import { User } from "@/types/user.types";
import { PhotoAvatar } from "./PhotoAvatar";
import { GradientAvatar } from "./GradientAvatar";

interface Props {
  user: User;
  size: "xs" | "sm" | "md" | "lg";
  className?: string;
}

function Avatar({ user, size, className }: Props) {
  let pxSize = 24;
  switch (size) {
    case "xs":
      pxSize = 24;
      break;
    case "sm":
      pxSize = 30;
      break;
    case "md":
      pxSize = 60;
      break;
    case "lg":
      pxSize = 96;
      break;
  }
  return user.avatar.url ? (
    <PhotoAvatar src={user.avatar.url} size={pxSize} className={className} />
  ) : (
    <GradientAvatar name={user.name} size={pxSize} className={className} />
  );
}

export { Avatar };
