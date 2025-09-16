// src/pages/Logout.js
const React = require("react");
const { useEffect } = React;
const { useNavigate } = require("react-router-dom");

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage/sessionStorage se token clear karo
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return React.createElement("p", null, "Logging out...");
}

module.exports = Logout;
