export const useSegment = (string) => {
  const countGrapheme = (string) => {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    return [...segmenter.segment(string)].length;
  };

  return { countGrapheme };
};
