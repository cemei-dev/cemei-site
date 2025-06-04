const VIBRANT_COLORS = [
  "#38BDF2", // blue-1000
  "#5AC4EF", // blue-800
  "#F279C8", // pink-1000
  "#EF8ECD", // pink-800
  "#EABE5C", // yellow-1000
  "#E8C577", // yellow-800
  "#8951CF", // purple-1000
  "#9B6ED3", // purple-800
  "#2ECC71", // green-1000
  "#27AE60", // green-800
  "#E74C3C", // red-1000
  "#C0392B", // red-800
  "#1ABC9C", // teal-1000
  "#16A085", // teal-800
  "#F39C12", // orange-1000
  "#D35400" // orange-800
];

export function generateEventColor(target: string): string {
  if (target === "1111111") {
    return "#8951CF";
  }

  const hash = target.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const index = Math.abs(hash) % VIBRANT_COLORS.length;

  return VIBRANT_COLORS[index];
}
