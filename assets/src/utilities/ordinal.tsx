type OneTwoOrThree = 1 | 2 | 3;

const firstSecondOrThird = (integer: OneTwoOrThree): string => {
  if (integer % 10 === 1) {
    return '1st';
  }

  if (integer % 10 === 2) {
    return '2nd';
  }

  if (integer % 10 === 3) {
    return '3rd';
  }
};

const isOneTwoOrThree = (arg: number): arg is OneTwoOrThree => {
  return [1, 2, 3].includes(arg);
};

const ordinal = (integer: number) => {
  if (isOneTwoOrThree(integer)) {
    return firstSecondOrThird(integer);
  }

  if ((integer > 3 && integer < 21) || !([1, 2, 3].includes(integer % 10))) {
    return `${integer}th`;
  }

  const remainder = integer % 10;

  if (isOneTwoOrThree(remainder)) {
    const tens = Math.floor(integer / 10);
    return tens.toString() + firstSecondOrThird(remainder);
  }
};

export default ordinal;
