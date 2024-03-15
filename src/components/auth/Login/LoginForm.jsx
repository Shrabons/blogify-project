import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthenticatin } from "../../../hooks/useAuthentication";
import Field from "../../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthenticatin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleSubmitData = async (loginFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        loginFormData
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/");
          toast.success("Welcome Your Home page !");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `User With email ${loginFormData.em} is not found !`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email Address is required !" })}
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
          {...register("password", { required: "password is required !" })}
          type="password"
          name="password"
          id="password"
          className={`w-full p-3 bg-[#030317] border ${
            errors.password ? "border-red-500" : "border-white/20"
          } border-white/20 rounded-md focus:outline-none focus:border-indigo-500`}
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <Field>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
