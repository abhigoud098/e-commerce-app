import { Link } from "react-router-dom";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiContext from "../../context/ApiContext";
import { FaShoppingCart } from "react-icons/fa";

function SignUp() {
  const { userInfo, setUserInfo } = useContext(ApiContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setUserInfo(data);
    onRegister(userInfo);
  };

  const onRegister = (userInfo) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = storedUsers.find(
      (user) => user.email.toLowerCase() === userInfo.email.toLowerCase(),
    );

    if (userExists) {
      toast.error("This email already exists. Please use another email.");
      return;
    }

    const updatedUsers = [...storedUsers, userInfo];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("User registered successfully!");
    reset();
  };

  return (
    <div className="signup-wrapper">
      <ToastContainer position="top-right" theme="colored" />

      <div className="img-signup-div">
        <div className="img-div">
          <h1>Shop</h1>
          <span>
            Verse <FaShoppingCart />
          </span>
          <p>@ShopVerce Feel the thrill of shopping</p>
        </div>

        <div className="signup">
          <div className="hader">
            <h5 className="logo-name">Shop<span>Verce</span></h5>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} placeholder="First Name" />

            <input {...register("lastName")} placeholder="Last Name" />

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
              type="tel"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit number",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <div className="gender-group">
              <label>
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: "Gender is required" })}
                />
                <span>Male</span>
              </label>

              <label>
                <input type="radio" value="female" {...register("gender")} />
                <span>Female</span>
              </label>

              <label>
                <input type="radio" value="other" {...register("gender")} />
                <span>Other</span>
              </label>
            </div>
            {errors.gender && <p className="error">{errors.gender.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message:
                    "Password must include uppercase, lowercase, number & special character",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}

            <input type="submit" value="Sign Up" />

            <span>
              Already have an account? <Link to="/app/login">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
