export const getUserId = (): string => {
  // In a real app, you would use proper authentication
  // For this MVP, we'll create a temporary ID if one doesn't exist
  let userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  
  if (!userId) {
    userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', userId);
    }
  }
  
  return userId;
};
