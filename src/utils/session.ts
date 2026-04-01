const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const SESSION_ACTIVITY_KEY = "fm_blog_last_activity";

export const updateActivity = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_ACTIVITY_KEY, Date.now().toString());
  }
};

export const isSessionExpired = (): boolean => {
  if (typeof window === "undefined") return false;

  const lastActivity = sessionStorage.getItem(SESSION_ACTIVITY_KEY);
  if (!lastActivity) return false;

  const elapsed = Date.now() - Number.parseInt(lastActivity, 10);
  return elapsed > SESSION_TIMEOUT_MS;
};

export const initSessionActivity = (onExpired: () => void): (() => void) => {
  updateActivity();

  const events = ["mousedown", "keydown", "scroll", "touchstart"];

  const handleActivity = () => {
    updateActivity();
  };

  for (const event of events) {
    document.addEventListener(event, handleActivity, { passive: true });
  }

  const checkInterval = setInterval(() => {
    if (isSessionExpired()) {
      clearInterval(checkInterval);
      for (const event of events) {
        document.removeEventListener(event, handleActivity);
      }
      onExpired();
    }
  }, 60000); // Check every minute

  return () => {
    clearInterval(checkInterval);
    for (const event of events) {
      document.removeEventListener(event, handleActivity);
    }
  };
};
