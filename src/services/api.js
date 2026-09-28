// Couche réseau, sans React : utilisable depuis un hook comme depuis un
// gestionnaire d'évènement (Login), un loader de route, un test, etc.

const BASE_URL = "http://localhost:8000";

/**
 * Erreur API : message exploitable pour l'UI + status HTTP (403, 404...)
 * pour permettre aux pages d'afficher forbidden() / notFound()
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Appel HTTP générique.
 * @param {string} pathOrUrl  "/api/login" ou une URL absolue déjà construite
 * @param {object} [options]
 * @param {string} [options.method]  "GET" par défaut
 * @param {object} [options.body]    sérialisé en JSON si présent
 * @param {string} [options.token]   ajoute l'en-tête Authorization: Bearer
 * @returns {Promise<any>}  le JSON de la réponse
 * @throws {Error}  message exploitable pour l'UI si la requête échoue
 */
export async function request(pathOrUrl, { method = "GET", body, token } = {}) {
  // url relative ou absolue
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${BASE_URL}${pathOrUrl}`;

  const headers = {};
  if (body !== undefined) {
    // entêtes de requête selon si body JSON présent ou non
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    // ajout Bearer si token présent
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    // appel de la requête
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // serveur injoignable, coupure réseau, CORS...
    throw new Error("Erreur de connexion au serveur");
  }

  // si réponse !== 2xx
  if (!response.ok) {
    // on tente de récupérer le message d'erreur JSON envoyé par l'API
    const data = await response.json().catch(() => null);

    // 404 sur une route inconnue (ou pas de JSON) => erreur de connexion,
    // sinon ressource introuvable (ex. USER_NOT_FOUND) => message de l'API
    if (response.status === 404 && (!data?.message || data.error === "NOT_FOUND")) {
      throw new ApiError("Erreur de connexion au serveur", response.status);
    }

    throw new ApiError(data?.message || `Erreur ${response.status}`, response.status);
  }

  // on retourne la donnée JSON reçue, sous forme d'objet
  return response.json();
}

// Fonctions dédiées par endpoint : le reste de l'app ne manipule plus d'URL.

/**
 * User
 */
export function register(credentials) {
  return request("/auth/register", { method: "POST", body: credentials });
}

export function login(credentials) {
  return request("/auth/login", { method: "POST", body: credentials });
}

export function authProfile(token) {
  return request("/auth/profile", { token });
}

export function apiUserUpdate(userData, token) {
  return request("/auth/profile", { method: "PUT", body: userData, token });
}

export function apiUserPassword(userData, token) {
  return request("/auth/password", { method: "PUT", body: userData, token });
}

export function assignedTasks(token) {
  return request("/dashboard/assigned-tasks", { token });
}

export function projects(token) {
  return request("/projects", { token });
}

export function projectById(id, token) {
  return request(`/projects/${id}`, { token });
}

export function projectsIdTasks(id, token) {
  return request(`/projects/${id}/tasks`, { token });
}

export function projectsCreate(data, token) {
  return request("/projects", { method: "POST", body: data, token });
}

export function projectsUpdate(id, data, token) {
  return request("/projects/" + id, { method: "PUT", body: data, token });
}

export function tasksCreate(projectId, data, token) {
  return request(`/projects/${projectId}/tasks`, { method: "POST", body: data, token });
}

export function tasksUpdate(projectId, taskId, data, token) {
  return request("/projects/" + projectId + "/tasks/" + taskId, { method: "PUT", body: data, token });
}

export function commentsCreate(projectId, taskId, data, token) {
  return request(`/projects/${projectId}/tasks/${taskId}/comments`, { method: "POST", body: data, token });
}

export function projectsAddContributor(projectId, data, token) {
  return request(`/projects/${projectId}/contributors`, { method: "POST", body: data, token });
}

export function projectsRemoveContributor(projectId, userId, token) {
  return request(`/projects/${projectId}/contributors/${userId}`, { method: "DELETE", token });
}

export function usersSearch(query, token) {
  return request(`/users/search?query=${encodeURIComponent(query)}`, { token });
}

export function tasksDelete(projectId, taskId, token) {
  return request(`/projects/${projectId}/tasks/${taskId}`, { method: "DELETE", token });
}
