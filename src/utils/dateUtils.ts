export const getExpirationText = (expirationDate: string) => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  const diffMs = expiration.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHrs < 1) {
    return "Less than 1 hour";
  } else if (diffHrs < 24) {
    return `${diffHrs} hours`;
  } else {
    const days = Math.floor(diffHrs / 24);
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }
};