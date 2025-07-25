import "./class.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import DropPics from "../../components/DropPics/DropPics";

type ClassFormFields = {
  user_id: number;
  exercice: string;
};

type ClassFormProps = {
  onClose?: () => void;
};

export default function ClassForm({ onClose }: ClassFormProps) {
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const currentUser = Array.isArray(data) ? data[0] : data;
        setUser(currentUser);
      })
      .catch((err) => console.error("Erreur utilisateur:", err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormFields>({
    defaultValues: {
      exercice: "",
      user_id: 0,
    },
  });

  const onSubmitForm = async (data: ClassFormFields) => {
    if (!user || !user.id) {
      toast.error("Utilisateur non chargé !");
      return;
    }

    if (!selectedFile) {
      toast.error("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", String(user.id));
    formData.append("exercice", data.exercice.trim());
    formData.append("pics", selectedFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercice`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        toast.success("Exercice créé !");
        if (onClose) onClose();
        setTimeout(() => {
          navigate("/class");
        }, 1000);
      } else {
        toast.error("Erreur lors de l’envoi");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur réseau");
    }
  };

  return (
    <section className="formPageWrapper">
      <div className="classFormBloc">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          transition={Bounce}
        />

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <h2 className="TitleForm">Création du cours</h2>

          <DropPics onFileSelect={setSelectedFile} />
          {!selectedFile && <p className="error">L'image est requise</p>}

          <input type="hidden" value={user?.id || 0} {...register("user_id")} />

          <label htmlFor="exercice" className="formLabel">
            Descriptif du cours
          </label>
          <textarea
            id="exercice"
            className="textareaClass"
            {...register("exercice", { required: true })}
            placeholder="Décrivez ici le contenu de votre cours (par ex. : cardio, renforcement, durée...)"
          />
          {errors.exercice && <p className="error">Ce champ est requis</p>}

          <input className="submitBtnClass" type="submit" value="Envoyer" />
        </form>
      </div>
    </section>
  );
}
