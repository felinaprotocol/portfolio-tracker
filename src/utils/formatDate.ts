export const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("en-EN");
  };
  