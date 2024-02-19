export const roundPriceToHundreds = (price: number) => {
  return Math.round(price / 100) * 100;
};

export const calculateDiscountedPrice = (
  price: number,
  discountPercent: number
) => {
  const discountMultiplier = 1 - discountPercent / 100;
  return roundPriceToHundreds(price * discountMultiplier);
};

export const formatDistance = (distance: number) => {
  if (distance >= 10000) {
    const inThousands = Math.floor(distance / 1000);
    const tensOfThousands = Math.floor(inThousands / 10);
    const remainingThousands = inThousands % 10;
    return remainingThousands === 0
      ? `${tensOfThousands}만`
      : `${tensOfThousands}만 ${remainingThousands}천`;
  } else if (distance >= 1000) {
    return `${Math.floor(distance / 1000)}천`;
  }
  return `${distance}`;
};
