import React from "react";

export const useMorph = () => {
  const morphUrl = (
    originalString: string,
    desiredText: string,
    setMorphedUrl: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // if (originalString.length > desiredText.length) {
    // TODO: Improve morphingUrl function
    const ticks = desiredText.length;
    const difference: number = originalString.length - desiredText.length;
    const shuffledBaseLink = desiredText
      .split("")
      .map((value: string, index: number) => ({
        value,
        sort: Math.random(),
        index,
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value, index }) => ({ value, index }));
    const times: number[] = [];
    let remaining = difference;
    for (let i = 0; i < ticks - 1; i++) {
      const tickLetters = Math.floor(difference / ticks);
      remaining = remaining - tickLetters;
      times.push(tickLetters);
    }
    times.unshift(remaining);

    let index = 0;
    const test = setInterval(() => {
      if (index >= ticks) {
        clearInterval(test);
        if (setIsLoading) {
          setIsLoading(false);
        }

        return;
      }
      setMorphedUrl((prevState: string) => {
        const newLink = (
          prevState.substring(0, shuffledBaseLink[index].index) +
          shuffledBaseLink[index].value +
          prevState.substring(shuffledBaseLink[index].index + 1)
        ).substring(0, prevState.length - times[++index - 1]);
        return newLink;
      });
    }, 50);
    // }
  };
  return morphUrl;
};
