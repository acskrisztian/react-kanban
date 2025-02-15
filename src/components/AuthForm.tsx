import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login, signup } from "@/lib/auth";
import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

interface AuthFormProps {
  type: string;
  onTypeChange: (type: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onTypeChange }) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(5, "Username must be at least 6 characters")
      .max(12, "Username must be at most 12 characters")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username cannot contain spaces or special characters"
      )
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    email:
      type === "signup"
        ? Yup.string()
            .email("Invalid email address")
            .required("Email is required")
        : Yup.string(),
  });

  const handleOnSubmit = async (values: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      let response;
      if (type === "login") {
        response = await login(values.username, values.password);
      } else {
        response = await signup(values.username, values.password, values.email);
      }
      dispatch(
        setUser({
          id: response.id,
          username: response.username,
          email: response.email,
        })
      );
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            exit={{
              height: 0,
              transition: { delay: 0.3, duration: 0.2, ease: "easeIn" },
            }}
          >
            <div className="pb-[16px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                exit={{ opacity: 0, transition: { delay: 0, duration: 0.3 } }}
                className="flex items-center gap-2 bg-red-400 rounded-[8px] text-white p-[8px] lg:p-[16px]"
              >
                <CircleAlert />
                {error}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleOnSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <Form>
            {type === "signup" && (
              <div className="flex flex-col mb-[8px]">
                <label
                  className="text-[14px] font-medium mb-[4px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            )}
            <div className="flex flex-col mb-[8px]">
              <label
                className="text-[14px] font-medium mb-[4px]"
                htmlFor="username"
              >
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.username && errors.username && (
                <div className="text-red-500 text-sm">{errors.username}</div>
              )}
            </div>
            <div className="flex flex-col mb-[16px]">
              <label
                className="text-[14px] font-medium mb-[4px]"
                htmlFor="Password"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>

            <Button
              className="mb-[24px] lg:mb-[32px]"
              type="submit"
              disabled={isSubmitting}
            >
              {type === "login" ? "Login" : "Sign up"}
            </Button>
            {type === "login" && (
              <p>
                Don't you have an account yet?{" "}
                <Button
                  className="px-0"
                  variant="link"
                  onClick={() => onTypeChange("signup")}
                >
                  Sign up
                </Button>
              </p>
            )}
            {type === "signup" && (
              <p>
                Already have an account?{" "}
                <Button
                  className="px-0"
                  variant="link"
                  onClick={() => onTypeChange("login")}
                >
                  Login
                </Button>
              </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
