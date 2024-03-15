import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../../common/Field";

const RegsitrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleRegistration = async (regFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        regFormData
      );

      if (response.status === 201) {
        navigate("/login");
        toast.success(
          "Your registration successfull . Pleage login your account !"
        );
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message} `,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "firstName is required !" })}
          type="text"
          name="firstName"
          id="firstName"
          className={`w-full p-3 bg-[#030317] border ${
            errors.firstName ? "border-red-500" : "border-white/20"
          } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "lastName is required !" })}
          type="lastName"
          name="lastName"
          id="lastName"
          className={`w-full p-3 bg-[#030317] border ${
            errors.lastName ? "border-red-500" : "border-white/20"
          } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "email Address is required !" })}
          type="email"
          name="email"
          id="email"
          className={`w-full p-3 bg-[#030317] border ${
            errors.email ? "border-red-500" : "border-white/20"
          } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "password is required !",
            minLength: {
              value: 8,
              message: "Youe password must be at least 8 characters",
            },
          })}
          type="password"
          name="password"
          id="password"
          className={`w-full p-3 bg-[#030317] border ${
            errors.password ? "border-red-500" : "border-white/20"
          } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Create Account
        </button>
      </div>
      <p className="text-center">
        Already have account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegsitrationForm;
