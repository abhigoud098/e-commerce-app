import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useContext } from "react";
// import ApiContext from "../../context/ApiContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const {setUser} = useContext(ApiContext);

  const navigate = useNavigate();

  const onSubmit = (logedUserData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.email === logedUserData.email &&
        user.password === logedUserData.password,
    );

    const loggedInUser = JSON.parse(localStorage.getItem("logedUser")) || [];
    if (
      !loggedInUser.find(
        (currentLogedUser) => existingUser.email === currentLogedUser.email,
      )
    ) {
      const updatedUsers = [...loggedInUser, existingUser];
      localStorage.setItem("logedUser", JSON.stringify(updatedUsers));
    }

    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    if (existingUser) {
      toast.loading("login...");
      setTimeout(() => {
        toast.dismiss();
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/app");
        }, 2000);
      }, 3000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer position="top-right" theme="colored" />

      <div className="login">
        <div className="hader">
          <span>Welcome Back..!</span>
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
            Not a member? <Link to="/app/Sign-up">Sign-Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
