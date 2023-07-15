import Image from "next/image";

interface Props {
  src: string;
  size: number;
  className?: string;
}

function PhotoAvatar({ src, size, className }: Props) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt="Avatar"
      style={{ width: size, height: size }}
      className={`rounded-full ring-1 ring-white ${className}`}
    />
  );
}

export { PhotoAvatar };
