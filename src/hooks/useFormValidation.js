import { useCallback, useState } from "react";

/**
 * Custom hook for form validation
 * Handles form state, validation, and error management
 */
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback(
    (field, value) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors]
  );

  const setFieldTouched = useCallback((field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const validateField = useCallback(
    (field, value) => {
      const rule = validationRules[field];
      if (!rule) return "";

      // Required validation
      if (rule.required && (!value || value.trim() === "")) {
        return rule.requiredMessage || `${field} is required`;
      }

      // Email validation
      if (rule.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return rule.emailMessage || "Please enter a valid email address";
        }
      }

      // Password validation
      if (rule.password && value) {
        if (value.length < 6) {
          return (
            rule.passwordMessage ||
            "Password must be at least 6 characters long"
          );
        }
      }

      // Custom validation
      if (rule.custom && value) {
        const customError = rule.custom(value);
        if (customError) {
          return customError;
        }
      }

      return "";
    },
    [validationRules]
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  // Validate field on blur
  const handleBlur = useCallback(
    (field) => {
      setFieldTouched(field);
      const error = validateField(field, values[field]);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [values, validateField, setFieldTouched]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Check if form is valid
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.keys(values).every((field) => {
      const rule = validationRules[field];
      if (rule?.required) {
        return values[field] && values[field].trim() !== "";
      }
      return true;
    });

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleBlur,
    resetForm,
    isFormValid,
  };
};

export default useFormValidation;
