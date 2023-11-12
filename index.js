const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const myCheckbox = document.getElementById("myCheckbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return re.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
  const re = /^(?=.*[0-9])||(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return re.test(String(password).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const myCheckboxValue = myCheckbox.value.trim();

  if (usernameValue === "") {
    setError(username, "Поле обязательно для ввода");
  } else if (usernameValue.length > 150) {
    setError(
      username,
      "Имя пользователя должно состоять максимум из 150 символов"
    );
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Поле обязательно для ввода");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Предоставьте действительный адрес электронной почты");
  } else if (emailValue.length > 100) {
    setError(email, "Емаил должен состоять максимум из 100 символов");
  } else {
    setSuccess(email);
  }
  if (passwordValue === "") {
    setError(password, "Поле обязательно для ввода");
  } else if (!isValidPassword(passwordValue)) {
    setError(
      password,
      "Пароль должен содержать хотя бы 1 цыфру или спецсимвол"
    );
  } else if (passwordValue.length < 8) {
    setError(password, "Пароль должен состоять минимум из 8 символов");
  } else if (passwordValue.length > 30) {
    setError(password, "Пароль должен состоять максимум из 30 символов");
  } else {
    setSuccess(password);
  }
  if (password2Value === "") {
    setError(password2, "Поле обязательно для ввода");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Пароли должны совпадать");
  } else {
    setSuccess(password2);
  }

  if (myCheckboxValue !== myCheckbox.checked) {
    setError(
      myCheckbox,
      "“Вы обязаны подтвердить, что хотите зарегистрироваться"
    );
  } else {
    setSuccess(myCheckbox);
  }
};

function checkCheckbox() {
  const checkbox = document.getElementById("myCheckbox");
  if (checkbox.checked) {
    console.log("");
  } else {
    console.log("Вы обязаны подтвердить, что хотите зарегистрироваться");
  }
}

let formData = {};
form.addEventListener("input", function (event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem("formData", JSON.stringify(formData));
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({
    email: email,
    username: username,
    password: password,
    password2: password2,
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Вы успешно создали аккаунт");
});
