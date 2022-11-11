import React from "react";

export const useMorph = () => {
  const morphUrl = (
    originalString: string,
    desiredText: string,
    setMorphedUrl: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setCopyUrl?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const ticks = desiredText.length;
    const difference: number = originalString.length - desiredText.length;
    const isLong = difference < 0 ? false : true;
    const shuffledDestinationLink = isLong
      ? desiredText
          .split("")
          .map((value: string, index: number) => ({
            value,
            sort: Math.random(),
            index,
          }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value, index }) => ({ value, index }))
      : desiredText.split("").map((value: string, index: number) => ({
          value,
          index,
        }));
    const times: number[] = [];

    if (isLong) {
      const tickLetters = Math.floor(difference / ticks);
      let remaining = difference - tickLetters * ticks;
      for (let i = 0; i < ticks; i++) {
        if (remaining > 0) {
          times.push(tickLetters + 1);
          remaining = remaining - 1;
        } else {
          times.push(tickLetters);
        }
      }
    }

    let index = 0;
    const morphing = setInterval(() => {
      if (index >= ticks) {
        clearInterval(morphing);
        if (setCopyUrl) setCopyUrl(true);
        if (setIsLoading) {
          setIsLoading(false);
        }
        return;
      }
      setMorphedUrl((prevState: string) => {
        const newLink = isLong
          ? (
              prevState.substring(0, shuffledDestinationLink[index].index) +
              shuffledDestinationLink[index].value +
              prevState.substring(shuffledDestinationLink[index].index + 1)
            ).substring(0, prevState.length - times[++index - 1])
          : prevState.substring(0, index) +
            shuffledDestinationLink[index].value +
            prevState.substring(++index);

        return newLink;
      });
    }, 50);
  };
  return morphUrl;
};
