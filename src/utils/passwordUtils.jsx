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

export const handlePasswordToggleAll = (
    inputRefs,
    passwordVisible,
    setPasswordVisible
) => {
    inputRefs.forEach((inputRef) => {
        togglePasswordVisibility(inputRef, passwordVisible, setPasswordVisible);
    });
};
