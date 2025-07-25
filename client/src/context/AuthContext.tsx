import React, { useContext, type ReactNode } from "react";

// IMPORTANT: Remplacez par le bon chemin vers votre AuthContext existant
// import { AuthContext } from '../context/AuthContext';

// OU si vous n'avez pas d'AuthContext, voici un exemple simple :
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading?: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Créer le contexte (uniquement si vous n'en avez pas déjà un)
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// 1. Hook personnalisé avec gestion d'erreur
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}

// 2. Composant de protection des routes
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading = false } = useAuth();

  // Affichage du loading pendant la vérification
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <div>🔄 Vérification de l'authentification...</div>
      </div>
    );
  }

  // Si non authentifié
  if (!isAuthenticated) {
    return (
      fallback || (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            margin: "20px",
          }}
        >
          <h2>🔒 Accès restreint</h2>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Se connecter
          </button>
        </div>
      )
    );
  }

  // Vérification du rôle si requis
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          margin: "20px",
        }}
      >
        <h2>⚠️ Accès insuffisant</h2>
        <p>Vous n'avez pas les permissions nécessaires pour cette page.</p>
        <p>
          Rôle requis: <strong>{requiredRole}</strong>
        </p>
        <p>
          Votre rôle: <strong>{user?.role || "Aucun"}</strong>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

// 3. Version simplifiée sans AuthContext externe
export function ExerciceAdminSimple() {
  // Si vous utilisez votre propre AuthContext, décommentez cette ligne :
  // const authContext = useContext(YourAuthContext);

  // Version mockée pour tester (remplacez par votre logique)
  const mockAuth = {
    user: {
      id: "1",
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      role: "admin",
    },
    isAuthenticated: true,
    isLoading: false,
    token: "mock-token",
    login: async () => {},
    logout: () => {},
  };

  const { user, isAuthenticated, logout } = mockAuth;

  // Vérification simple de l'authentification
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>🔒 Accès restreint</h2>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Se connecter
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <div>
          <h2>
            👋 Bonjour {user?.firstname} {user?.lastname}
          </h2>
          <p style={{ margin: 0, color: "#666" }}>
            Administration des exercices
          </p>
        </div>

        <div>
          <span style={{ marginRight: "15px", color: "#666" }}>
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            type="button"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      <main>
        <h3>🏋️ Gestion des exercices</h3>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p>Interface d'administration des exercices...</p>
          {/* Votre contenu ici */}
        </div>
      </main>
    </div>
  );
}

// 4. Provider simple (si vous n'en avez pas)
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState<string | null>(null);

  const isAuthenticated = !!user && !!token;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Votre logique de login ici
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  React.useEffect(() => {
    // Vérifier le token au démarrage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // Vérifier la validité du token...
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
