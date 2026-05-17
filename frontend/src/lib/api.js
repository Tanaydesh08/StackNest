const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/backend";

async function apiRequest(path, options = {}) {
  const { method = "GET", body, token, headers = {} } = options;
  const isFormData = body instanceof FormData;

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? parseResponse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.error || text || "Request failed");
  }

  return data;
}

function parseResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function loginUser(form) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: {
      email: form.email,
      password: form.password,
    },
  });
}

export function signupUser(form) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: {
      username: form.username,
      email: form.email,
      password: form.password,
    },
  });
}

export function getPosts() {
  return apiRequest("/posts");
}

export function getCommunities() {
  return apiRequest("/communities");
}

export function createCommunity(form, token) {
  return apiRequest("/communities", {
    method: "POST",
    token,
    body: {
      name: form.name,
      description: form.description,
    },
  });
}

export function createPost(form, token) {
  return apiRequest("/posts", {
    method: "POST",
    token,
    body: {
      title: form.title,
      content: form.content,
      imageUrl: form.imageUrl,
      communitySlug: form.communitySlug,
    },
  });
}

export function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest("/upload", {
    method: "POST",
    body: formData,
  });
}

export function voteOnPost(postId, value, token) {
  return apiRequest("/votes", {
    method: "POST",
    token,
    body: {
      postId,
      value,
    },
  });
}

export function getComments(postId) {
  return apiRequest(`/comments/post/${postId}`);
}

export function addComment(postId, content, token) {
  return apiRequest("/comments", {
    method: "POST",
    token,
    body: {
      postId,
      content,
    },
  });
}
