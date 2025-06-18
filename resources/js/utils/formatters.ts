export const formatPrice = (value: number | string | null | undefined): string => {
    if (value === null || typeof value === 'undefined') {
      return 'N/A'; // Or a default like '0.00'
    }
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (typeof numericValue === 'number' && !isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
    return 'N/A'; // Fallback if conversion fails
  };
