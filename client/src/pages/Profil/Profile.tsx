import { useEffect, useState } from "react";
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
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'utilisateur.");
        }
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

      .catch((error) => {
        console.error("Erreur dans fetch:", error);
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firstnameError || lastnameError || emailError) {
      alert("Veuillez corriger les erreurs avant de soumettre.");
      return;
    }

    if (!user) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          profile_pic: profilePic,
        }),
      });

      setUser({
        ...user,
        firstname,
        lastname,
        email,
        profile_pic: profilePic,
      });

      alert("Profil mis à jour avec succès ! ✅");
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.length > 15
      ? setFirstnameError("Le prénom ne doit pas dépasser 15 caractères.")
      : setFirstnameError("");
    setFirstname(value);
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.length > 15
      ? setLastnameError("Le nom ne doit pas dépasser 15 caractères.")
      : setLastnameError("");
    setLastname(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.length > 50
      ? setEmailError("L'email ne doit pas dépasser 50 caractères.")
      : setEmailError("");
    setEmail(value);
  };

  return (
    <section>
      <div className="header1" />
      <div className="section1">
        <div className="profil">
          <h1>Profil</h1>
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
              onChange={handleFirstnameChange}
            />
            {firstnameError && <p className="error">{firstnameError}</p>}
          </label>

          <label className="label-profil">
            <p>Nom</p>
            <input
              type="text"
              value={lastname}
              onChange={handleLastnameChange}
            />
            {lastnameError && <p className="error">{lastnameError}</p>}
          </label>

          <label className="label-profil">
            <p>Email</p>
            <input type="email" value={email} onChange={handleEmailChange} />
            {emailError && <p className="error">{emailError}</p>}
          </label>

          <button className="btn-entrer" type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
