type CancelFlag = { cancelled: boolean };

export const checkCancelBeforeDispatch = (cancelled: CancelFlag, action?: () => void): boolean => {
  if (cancelled.cancelled) {
    return true;
  }
  action?.();
  return false;
};
