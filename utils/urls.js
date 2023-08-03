export let BASE_URL;
if (typeof window !== "undefined") {
  // Client-side-only code
  if (window.location.origin === "http://localhost:3000") {
    // local host
    BASE_URL = "http://localhost:3000";
    console.log("You are on development mode ");
  } else {
    // on production
    BASE_URL = "https://registration-website-ib2j.onrender.com";
  }
}
