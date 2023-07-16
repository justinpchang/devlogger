interface Props {
  size: number;
  className?: string;
}

function Logo({ size, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 6C15 4.89543 15.8954 4 17 4H31C32.1046 4 33 4.89543 33 6V12C33 13.1046 32.1046 14 31 14H17C15.8954 14 15 13.1046 15 12V6Z"
        fill="#B12626"
      />
      <path
        d="M1 17C1 15.8954 1.89543 15 3 15H17C18.1046 15 19 15.8954 19 17V23C19 24.1046 18.1046 25 17 25H3C1.89543 25 1 24.1046 1 23V17Z"
        fill="#B12626"
      />
      <path
        d="M21.5 17C21.5 16.1716 22.1716 15.5 23 15.5H37C37.8284 15.5 38.5 16.1716 38.5 17V23C38.5 23.8284 37.8284 24.5 37 24.5H23C22.1716 24.5 21.5 23.8284 21.5 23V17Z"
        stroke="#808080"
      />
      <path
        d="M7 28C7 26.8954 7.89543 26 9 26H23C24.1046 26 25 26.8954 25 28V34C25 35.1046 24.1046 36 23 36H9C7.89543 36 7 35.1046 7 34V28Z"
        fill="#B12626"
      />
    </svg>
  );
}

export { Logo };
