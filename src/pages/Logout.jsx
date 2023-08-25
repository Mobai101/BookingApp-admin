const Logout = (props) => {
  localStorage.removeItem("token");
  localStorage.removeItem("adminUser");
  window.location.href = "/login";
};

export default Logout;
