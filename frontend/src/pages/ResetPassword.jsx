import {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

export default function ResetPassword() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const email =
    location.state?.email || "";

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const handleReset =
    async () => {

      setError("");

      setMessage("");

      if (
        !email
      ) {

        setError(
          "Invalid reset session."
        );

        return;

      }

      if (
        password !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;

      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (
        !passwordRegex.test(
          password
        )
      ) {

        setError(
          "Password must contain uppercase, lowercase, number and special character."
        );

        return;

      }

      try {

        setLoading(
          true
        );

        await api.post(
          "/password/reset",
          {
            email,
            password,
          }
        );

        setMessage(
          "Password changed successfully."
        );

        setTimeout(
          () => {

            navigate(
              "/login"
            );

          },
          1500
        );

      }

      catch (error) {

        setError(
          error.response?.data?.message ||
          "Unable to reset password."
        );

      }

      finally {

        setLoading(
          false
        );

      }

    };

  return (

    <>

      <section className="relative overflow-hidden bg-[#111827] py-24">

        <div className="container-custom text-center">

          <h1 className="text-5xl font-bold text-white">

            Reset Password

          </h1>

          <p className="mt-5 text-neutral-400">

            Create a new secure password.

          </p>

        </div>

      </section>

      <section className="section-padding bg-white">

        <div className="container-custom">

          <div className="mx-auto max-w-lg rounded-2xl border border-[--border] bg-white p-8 shadow-sm">

            {

              message &&

              <p className="mb-4 text-green-600">

                {message}

              </p>

            }

            {

              error &&

              <p className="mb-4 text-red-600">

                {error}

              </p>

            }

            <div className="space-y-5">

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
              />

              <button
                onClick={
                  handleReset
                }
                disabled={
                  loading
                }
                className="primary-button w-full justify-center"
              >

                {

                  loading

                  ? "Updating..."

                  : "Reset Password"

                }

              </button>

            </div>

            <div className="mt-8 border-t border-[--border] pt-6 text-center">

              <Link
                to="/login"
                className="font-medium hover:underline"
              >

                Back to Login

              </Link>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}