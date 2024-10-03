export const getButtonColorScheme = (liked: boolean) =>
  liked ? "red" : "gray";

export const getButtonHoverStyle = (liked: boolean) => ({
  backgroundColor: liked ? "red.100" : "gray.100",
});

export const getButtonActiveStyle = (liked: boolean) => ({
  backgroundColor: liked ? "red.200" : "gray.200",
});

export const getIconColor = (liked: boolean) =>
  liked ? "red.600" : "gray.500";
