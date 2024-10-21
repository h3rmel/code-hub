const saveUserData = (user) => {
  const userData = {
    id: user.uid,
    email: user.email,
  };

  localStorage.setItem("@detailUser", JSON.stringify(userData));
};

export { saveUserData };

