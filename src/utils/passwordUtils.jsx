export const togglePasswordVisibility = (
    inputRef,
    passwordVisible,
    setPasswordVisible
) => {
    const input = inputRef.current;

    if (input) {
        if (passwordVisible) {
            input.type = "password";
        } else {
            input.type = "text";
        }
    }

    setPasswordVisible(!passwordVisible);
};
