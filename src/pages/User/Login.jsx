import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useResetPasswordMutation
} from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FiLock, FiLogIn, FiUser, FiKey, FiX, FiCheckCircle, FiXCircle } from "react-icons/fi";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import { setUser } from "../../redux/slices/authSlice.js";

// Set app element for accessibility
Modal.setAppElement("#root");

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [
    resetPassword,
    { isLoading: isResetting, isError: resetError, error: resetErrorData }
  ] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    userId: "",
    password: ""
  });

  const [resetForm, setResetForm] = useState({
    userId: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: ""
  });

  const [resetErrors, setResetErrors] = useState({
    userId: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordValidity, setPasswordValidity] = useState({
    lengthValid: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", key: "lengthValid" },
    { label: "Contains uppercase letter", key: "hasUpper" },
    { label: "Contains lowercase letter", key: "hasLower" },
    { label: "Contains number", key: "hasNumber" },
    { label: "Contains special character", key: "hasSpecial" }
  ];

  const validatePassword = (password) => {
    return {
      lengthValid: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { userId: "", password: "" };

    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required";
      valid = false;
    } else if (isNaN(formData.userId)) {
      newErrors.userId = "User ID must be a number";
      valid = false;
    } else if (formData.userId.length < 4) {
      newErrors.userId = "User ID must be at least 4 digits";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submissionData = {
      userId: Number(formData.userId),
      password: formData.password
    };

    try {
      const res = await login(submissionData).unwrap();
      dispatch(setUser({ user: res.user, token: res.token }));
      toast.success("Login successful!");
      setFormData({ userId: "", password: "" });
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

  const validateResetForm = () => {
    let valid = true;
    const newErrors = {
      userId: "",
      newPassword: "",
      confirmPassword: ""
    };

    if (!resetForm.userId.trim()) {
      newErrors.userId = "User ID is required";
      valid = false;
    } else if (isNaN(resetForm.userId)) {
      newErrors.userId = "User ID must be a number";
      valid = false;
    }

    if (!resetForm.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (resetForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      valid = false;
    }

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setResetErrors(newErrors);
    return valid;
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!validateResetForm()) return;

    try {
      await resetPassword({
        userId: Number(resetForm.userId),
        newPassword: resetForm.newPassword
      }).unwrap();

      toast.success("Password reset successfully!");
      setIsModalOpen(false);
      setResetForm({ userId: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err?.data?.message || "Password reset failed");
    }
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;

    if (name === "userId") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setResetForm((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setResetForm((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "newPassword") {
      const validity = validatePassword(value);
      setPasswordValidity(validity);
    }

    if (resetErrors[name]) {
      setResetErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div>
        <div className="max-width bg-white w-full space-y-8 p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your User ID and Password
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <InputField
                label="Employee ID"
                name="userId"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.userId}
                onChange={handleChange}
                leftIcon={<FiUser className="text-gray-400" />}
                error={errors.userId}
                placeholder="Enter your employee ID"
                autoComplete="username"
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<FiLock className="text-gray-400" />}
                error={errors.password}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="font-medium cursor-pointer text-primary hover:text-gray-600"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="orange"
                  className="font-bold mt-4"
                  size="medium"
                  icon={<FiLogIn size={24} />}
                  iconPosition="left"
                  disabled={isLoading}
                >
                  Log In
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Reset Password Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content w-96"
        overlayClassName="modal-overlay"
      >
        <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <FiKey className="mx-auto w-12 h-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-gray-600">
              Enter your User ID and new password
            </p>
          </div>

          {resetError && (
            <ErrorMessage
              message={resetErrorData?.data?.message || "Password reset failed"}
            />
          )}

          <form onSubmit={handleResetSubmit} className="space-y-6">
            <InputField
              label="User ID"
              name="userId"
              type="text"
              inputMode="numeric"
              value={resetForm.userId}
              onChange={handleResetChange}
              leftIcon={<FiUser className="text-gray-400" />}
              error={resetErrors.userId}
              placeholder="Enter your user ID"
            />

            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              value={resetForm.newPassword}
              onChange={handleResetChange}
              leftIcon={<FiLock className="text-gray-400" />}
              error={resetErrors.newPassword}
              placeholder="Enter new password"
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={resetForm.confirmPassword}
              onChange={handleResetChange}
              leftIcon={<FiLock className="text-gray-400" />}
              error={resetErrors.confirmPassword}
              placeholder="Confirm new password"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
              <ul className="space-y-2">
                {passwordRequirements.map((req) => {
                  const isValid = passwordValidity[req.key];
                  return (
                    <li key={req.key} className="flex items-center gap-2 text-sm">
                      {isValid ? (
                        <FiCheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <FiXCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={isValid ? "text-green-600" : "text-red-600"}>
              {req.label}
            </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {isResetting ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="orange"
                size="medium"
                disabled={
                  isResetting ||
                  !Object.values(passwordValidity).every(Boolean) ||
                  resetForm.newPassword !== resetForm.confirmPassword
                }
                className="mt-4"
              >
                Reset Password
              </Button>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
};

// Add these styles to your CSS
const customStyles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    position: relative;
    margin: 0 1rem;
    animation: modalEnter 0.3s ease-out;
  }

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: translateY(-70px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

export default LoginPage;
