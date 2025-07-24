import { useCallback, useEffect, useState } from "react";
import "./Exercice.css";

// Type pour les exercices avec données utilisateur (ce que vous recevez de l'API)
type ExerciceItem = {
  id: number;
  user_id: number;
  exercice: string;
  pics: string;
  firstname: string;
  lastname: string;
  email: string;
};

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

function ExerciceAdmin() {
  const [exerciceList, setExerciceList] = useState<ExerciceItem[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editedExercice, setEditedExercice] = useState("");
  const [editedPics, setEditedPics] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // 1) Récupérer l'ID utilisateur depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Contenu localStorage 'user':", storedUser); // Debug

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("User parsé:", parsedUser); // Debug

        if (parsedUser?.id) {
          fetchUserFromAPI(parsedUser.id);
        } else {
          console.log("Pas d'ID trouvé dans le user"); // Debug
          setUser(null);
        }
      } catch (error) {
        console.error("Erreur parsing user localStorage", error);
        setUser(null);
      }
    } else {
      console.log("Aucun user dans localStorage"); // Debug
    }
  }, []);

  // 2) Fonction pour récupérer l'utilisateur complet depuis la base via API
  const fetchUserFromAPI = async (userId: number) => {
    console.log("Tentative de récupération user avec ID:", userId); // Debug

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}`,
      );
      console.log("Réponse API user:", response.status); // Debug

      if (!response.ok) throw new Error("Erreur API utilisateur");
      const data = await response.json();
      console.log("Données user récupérées:", data); // Debug

      setUser(data);
    } catch (error) {
      console.error("Erreur récupération user API :", error);
      setUser(null);
    }
  };

  // 3) Récupérer tous les exercices (maintenant avec les infos utilisateur)
  const getExercice = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercices/`,
      );
      if (!response.ok) throw new Error("Erreur réseau");
      const data: ExerciceItem[] = await response.json();
      setExerciceList(data);
    } catch (error) {
      console.error("Erreur récupération exercices :", error);
    }
  }, []);

  useEffect(() => {
    getExercice();
  }, [getExercice]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercices/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Erreur suppression");
      getExercice();
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleEdit = (exercice: ExerciceItem) => {
    setEditId(exercice.id);
    setEditedExercice(exercice.exercice);
    setEditedPics(exercice.pics);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Utilisateur non connecté");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercices/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exercice: editedExercice,
            pics: editedPics,
            user_id: user.id,
          }),
        },
      );
      if (!res.ok) throw new Error("Erreur mise à jour");
      setEditId(null);
      setEditedExercice("");
      setEditedPics("");
      getExercice();
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="exercice-admin">
      <h2>Liste des exercices</h2>

      {!user ? (
        <p style={{ color: "red" }}>⚠️ Utilisateur non connecté</p>
      ) : (
        <p>👋 Bonjour {user.firstname} !</p>
      )}

      {exerciceList.length === 0 ? (
        <p>Aucun exercice trouvé.</p>
      ) : (
        <div className="exercice-list">
          {exerciceList.map((exercice) => (
            <div className="exercice-item" key={exercice.id}>
              {editId === exercice.id ? (
                <form className="edit-form" onSubmit={handleUpdate}>
                  <input
                    type="text"
                    value={editedExercice}
                    onChange={(e) => setEditedExercice(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={editedPics}
                    onChange={(e) => setEditedPics(e.target.value)}
                    required
                  />
                  <button type="submit">💾 Sauvegarder</button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="cancel-btn"
                  >
                    ❌ Annuler
                  </button>
                </form>
              ) : (
                <>
                  <div>
                    <strong>{exercice.exercice}</strong>
                    <p>{exercice.pics}</p>
                    {/* Maintenant vous pouvez afficher les infos utilisateur directement */}
                    <p className="user-info">
                      📝 Créé par: {exercice.firstname} {exercice.lastname}
                      <br />📧 Email: {exercice.email}
                    </p>
                  </div>
                  <div className="exercice-actions">
                    <button type="button" onClick={() => handleEdit(exercice)}>
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(exercice.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciceAdmin;
