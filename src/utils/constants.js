// development
// export const BASE_URL = "http://localhost:8080"

// production
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:8080" : "/api";
