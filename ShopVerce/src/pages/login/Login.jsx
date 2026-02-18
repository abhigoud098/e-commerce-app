import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (logedUserData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.email === logedUserData.email &&
        user.password === logedUserData.password
    );

    if (!existingUser) {
      toast.error("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    toast.loading("Logging in...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Welcome back 🎉");
      setTimeout(() => navigate("/app"), 1500);
    }, 2000);
  };

  return (
    <div className="login-wrapper">
      <ToastContainer position="top-right" theme="colored" />

      <div className="login">
        <div className="header">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <input type="submit" value="Login" />

          <span>
            Not a member? <Link to="/app/Sign-up">Create account</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
