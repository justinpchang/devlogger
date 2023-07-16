import ColorHash from "color-hash";
import fontColorContrast from "font-color-contrast";

interface Props {
  name: string;
  size: number;
  className?: string;
}

const colorHash = new ColorHash({ saturation: 1.0 });

const stringToColor = (s: string): string => colorHash.hex(s);

const generateColors = (s: string): [string, string] => {
  const s1 = s.substring(0, s.length / 2);
  const s2 = s.substring(s.length / 2);
  const c1 = stringToColor(s1);
  const c2 = stringToColor(s2);

  return [c1, c2];
};

function blendColors(c1: string, c2: string) {
  const [rA, gA, bA] = c1.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const [rB, gB, bB] = c2.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * 0.5)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(gA + (gB - gA) * 0.5)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(bA + (bB - bA) * 0.5)
    .toString(16)
    .padStart(2, "0");
  return "#" + r + g + b;
}

function GradientAvatar({ name, size, className }: Props) {
  if (!name) return null;

  const [c1, c2] = generateColors(name);
  const midpoint = blendColors(c1, c2);
  const fontColor = fontColorContrast(midpoint);

  return (
    <div className={"relative " + className} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#gradient)" />
        <defs>
          <linearGradient
            id="gradient"
            x1="0"
            y1="0"
            x2={size}
            y2={size}
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={c1} />
            <stop offset="1" stop-color={c2} />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ color: fontColor, fontSize: (size * 2) / 3 }}
      >
        {name[0].toUpperCase()}
      </div>
    </div>
  );
}

export { GradientAvatar };
