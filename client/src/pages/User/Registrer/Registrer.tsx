import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "./register.css";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password?: string;
  profil_pic?: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");
  const navigate = useNavigate();

  const handleForm = async (data: FormData) => {
    try {
      const userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      if (response.ok) {
        toast.success("Votre compte a bien été créé !");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Erreur lors de la création de votre compte");
      }
    } catch (err) {
      toast.error("Erreur !");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="register-page">
        <h1 className="titleRegister">Formulaire d'inscription</h1>
        <div className="register-form-container">
          <form onSubmit={handleSubmit(handleForm)}>
            <h2 className="userRegister">Utilisateur</h2>
            <div className="formGroupContainer">
              <div className="form-group">
                <label htmlFor="firstname">Prénom</label>
                <input
                  {...register("firstname", {
                    required: "Merci de remplir ce champ",
                    minLength: {
                      value: 4,
                      message: "Le champ doit contenir au minimum 4 caractères",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Le champ doit contenir au maximum 50 caractères",
                    },
                  })}
                  name="firstname"
                  type="text"
                  placeholder="John"
                />
                {errors.firstname && (
                  <span className="error">{errors.firstname.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Nom</label>

                <input
                  {...register("lastname", {
                    required: "Merci de remplir ce champ",
                    minLength: {
                      value: 4,
                      message: "Le champ doit contenir au minimum 4 caractères",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Le champ doit contenir au maximum 50 caractères",
                    },
                  })}
                  name="lastname"
                  type="text"
                  placeholder="Doe"
                />
                {errors.lastname && (
                  <span className="error">{errors.lastname.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", {
                    required: "Ce champ est requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Le format d'email n'est pas valide",
                    },
                  })}
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="hashed_password">Mot de passe</label>
                <input
                  {...register("password", {
                    required: "Mot de passe requis",
                  })}
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password">
                  Confirmez le mot de passe
                </label>
                <input
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === password ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  name="confirm_password"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                />
                {errors.confirm_password && (
                  <span className="error">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Créer mon compte
            </button>
          </form>
        </div>

        <p className="already-account">
          Vous avez déjà créé un compte ?<br />
          <NavLink to="/login">Identifiez-vous !</NavLink>
        </p>
      </div>
    </>
  );
}

export default Register;
