import { useEffect, useState } from "react";
import "./Exercice.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Exercice = {
  id: number;
  user_id: number;
  exercice: string;
  pics: string;
  firstname: string;
  lastname: string;
  email: string;
};

function ExerciceAdmin() {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [exerciceEdit, setExerciceEdit] = useState("");
  const [picEdit, setPicEdit] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/exercices/`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then(setExercices)
      .catch(() => setError("Erreur lors du chargement"))
      .finally(() => setLoading(false));
  }, []);

  const getImageUrl = (pics: string) => {
    if (!pics) return "";
    if (pics.startsWith("http")) return pics;
    return `${import.meta.env.VITE_API_URL}/uploads/${pics}`;
  };

  const deleteExercice = (id: number) => {
    toast.info(
      <>
        Supprimer cet exercice ?
        <button
          type="button"
          onClick={() => {
            toast.dismiss();
            fetch(`${import.meta.env.VITE_API_URL}/api/exercices/${id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error();
                setExercices((exs) => exs.filter((ex) => ex.id !== id));
                toast.success("Exercice supprimé");
              })
              .catch(() => toast.error("Erreur lors de la suppression"));
          }}
          style={{
            marginLeft: "10px",
            backgroundColor: "#d62828",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Confirmer
        </button>
      </>,
      { autoClose: 5000 },
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const current = exercices.find((ex) => ex.id === id);
    const userId = current?.user_id || 1;

    fetch(`${import.meta.env.VITE_API_URL}/api/exercices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercice: exerciceEdit,
        pics: picEdit,
        user_id: userId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setExercices((prev) =>
          prev.map((ex) =>
            ex.id === id
              ? { ...ex, exercice: exerciceEdit, pics: picEdit }
              : ex,
          ),
        );
        setEditId(null);
        toast.success("Exercice modifié");
      })
      .catch(() => toast.error("Erreur lors de la modification"));
  };

  // Extraire la fonction d'erreur pour l'image hors JSX
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.style.display = "none";
  };

  if (loading) return <div className="exercice-admin">Chargement...</div>;
  if (error) return <div className="exercice-admin">Erreur: {error}</div>;

  return (
    <div className="exercice-admin">
      <h2>Liste des exercices</h2>

      <div className="exercice-list">
        {exercices.length === 0 ? (
          <p>Aucun exercice trouvé</p>
        ) : (
          exercices.map((ex) => (
            <div key={ex.id} className="exercice-item">
              {editId === ex.id ? (
                <form onSubmit={(e) => handleEdit(e, ex.id)}>
                  <input
                    type="text"
                    value={exerciceEdit}
                    onChange={(e) => setExerciceEdit(e.target.value)}
                  />
                  <input
                    type="text"
                    value={picEdit}
                    onChange={(e) => setPicEdit(e.target.value)}
                  />
                  <button type="submit">Sauvegarder</button>
                  <button type="button" onClick={() => setEditId(null)}>
                    Annuler
                  </button>
                </form>
              ) : (
                <>
                  {ex.pics && (
                    <img
                      src={getImageUrl(ex.pics)}
                      alt={ex.exercice}
                      style={{ maxWidth: 200, maxHeight: 150 }}
                      onError={handleImageError}
                    />
                  )}
                  <p>{ex.exercice}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(ex.id);
                      setExerciceEdit(ex.exercice);
                      setPicEdit(ex.pics);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    style={{ color: "red", marginLeft: 10 }}
                    onClick={() => deleteExercice(ex.id)}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default ExerciceAdmin;
