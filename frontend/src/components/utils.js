export function formatPrice(number) {
  const scales = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" },
    { value: 1, suffix: "" },
  ];

  for (const scale of scales) {
    if (number >= scale.value) {
      return (
        (number / scale.value).toFixed(2).replace(/\.00$/, "") + scale.suffix
      );
    }
  }

  return number.toString();
}
