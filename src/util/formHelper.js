/**
   * Validate the field on mount (setting the blur status to false validates
   * the field and leaves it unblurred so that the error isn't shown).
   */
  useEffect(() => {
    setFieldTouched(fieldName, false);
  }, [setFieldTouched, fieldName]);

  /**
   * Add an event listener to submit the form when enter is pressed.
   * Without this Formik will only submit the form when enter is pressed
   * while an input is focused.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  /**
   * Focus the field on mount.
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
