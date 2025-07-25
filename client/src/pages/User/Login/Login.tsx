import "./login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
};

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        let errorMessage = `Erreur ${response.status}`;

        try {
          const errorData = await response.text();
          const jsonError = JSON.parse(errorData);
          errorMessage = jsonError.message || errorMessage;
        } catch {
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La réponse n'est pas au format JSON");
      }

      const data = await response.json();

      if (data.user) {
        const token = data.token || `temp_token_${Date.now()}`;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, data };
      }
      throw new Error("Données utilisateur manquantes dans la réponse");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur inconnue";
      return { success: false, error: errorMessage };
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const result = await handleLogin(data.email, data.password);

      if (result.success) {
        toast.success("Connexion réussie !");
        login(data.email, data.password);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        toast.error(result.error || "Erreur de connexion");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Bounce}
      />
      <div className="login-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email requis",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format d'email invalide",
                },
              })}
              type="email"
              placeholder="john@doe.com"
              className="form-input"
              id="email"
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Mot de passe
            </label>
            <input
              {...register("password", {
                required: "Mot de passe requis",
                minLength: {
                  value: 8,
                  message: "Le mot de passe doit faire au moins 8 caractères",
                },
              })}
              type="password"
              className="form-input"
              placeholder="Entrez votre mot de passe"
              id="password"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
      <p className="inscription">
        Vous n'avez pas encore de compte ?<br />
        <NavLink to="/inscription">Inscrivez-vous !</NavLink>
      </p>
    </section>
  );
}

export default Login;
