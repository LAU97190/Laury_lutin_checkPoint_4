import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
  profile_pic: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération.");
        return response.json();
      })
      .then((data) => {
        const currentUser = data[0];
        setUser(currentUser);
        setFirstname(currentUser.firstname);
        setLastname(currentUser.lastname);
        setEmail(currentUser.email);
        setProfilePic(currentUser.profile_pic);
      })
      .catch((error) => console.error("Erreur dans fetch:", error));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firstnameError || lastnameError || emailError) {
      alert("Corrige les erreurs avant de soumettre.");
      return;
    }

    if (!user) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          profile_pic: profilePic,
        }),
      });

      setUser({ ...user, firstname, lastname, email, profile_pic: profilePic });
      alert("Profil mis à jour avec succès ! ✅");
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <section className="section1">
      <header className="header1">
        <h1>Bienvenue {firstname} !</h1>
      </header>

      <div className="profil">
        <div className="img-profil">
          <img src={profilePic} alt="Avatar" />
        </div>
      </div>

      <form className="form" onSubmit={handleUpdate}>
        <label className="label-profil">
          <p>Prénom</p>
          <input
            type="text"
            value={firstname}
            onChange={(e) => {
              const val = e.target.value;
              setFirstname(val);
              setFirstnameError(val.length > 15 ? "Max 15 caractères." : "");
            }}
          />
          {firstnameError && <p className="error">{firstnameError}</p>}
        </label>

        <label className="label-profil">
          <p>Nom</p>
          <input
            type="text"
            value={lastname}
            onChange={(e) => {
              const val = e.target.value;
              setLastname(val);
              setLastnameError(val.length > 15 ? "Max 15 caractères." : "");
            }}
          />
          {lastnameError && <p className="error">{lastnameError}</p>}
        </label>

        <label className="label-profil">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const val = e.target.value;
              setEmail(val);
              setEmailError(val.length > 50 ? "Max 50 caractères." : "");
            }}
          />
          {emailError && <p className="error">{emailError}</p>}
        </label>

        <button className="btn-entrer" type="submit">
          Enregistrer
        </button>
      </form>

      <div className="TitleWithBtn">
        <h3 className="TitleClass">Gestion des exercices</h3>
        <div className="btn-group">
          <Link className="btn-white" to="/list-class">
            Consulter
          </Link>
          <Link className="btn-white" to="/class">
            Ajouter
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;
