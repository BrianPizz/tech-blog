const logoutHandler = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('#logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', logoutHandler);
    }
});


// console.log('Logout JavaScript file loaded');
