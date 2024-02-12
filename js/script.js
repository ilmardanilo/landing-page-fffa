const button = document.querySelector("button");

const addLoading = () => {
  button.innerHTML =
    '<img src="./assets/images/loading.png" alt="loading" class="loading" / >';
};

const removeLoading = () => {
  button.innerHTML = "SEND";
};

const handleSubmit = (event) => {
  event.preventDefault();
  addLoading();

  const nameOfResponsible = document.querySelector(
    "input[name=name_of_responsible]"
  ).value;
  const nameOfChild = document.querySelector("input[name=name_of_child]").value;
  const age = document.querySelector("input[name=age]").value;
  const playingExperience = document.querySelector(
    "input[name=playing_experience]"
  ).value;
  const email = document.querySelector("input[name=email]").value;
  const freeTrialDay = document.querySelector(
    "input[name=free_trial_day]"
  ).value;

  const paramsToSendEmail = {
    from_name: nameOfResponsible,
    message: `
    Responsible person's name: ${nameOfResponsible}
    Name of child: ${nameOfChild}
    Age: ${age}
    Playing experience: ${playingExperience}
    Email: ${email}
    Day interested in doing a free trial: ${freeTrialDay}
    `,
  };

  emailjs.send("service_fn5gd0i", "template_wr5whhp", paramsToSendEmail);

  fetch("https://api.sheetmonkey.io/form/6s5ZiBDmQu8WhCoHU1XiNL", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name_of_responsible: nameOfResponsible,
      name_of_child: nameOfChild,
      age,
      playing_experience: playingExperience,
      email,
      free_trial_day: freeTrialDay,
    }),
  }).then(() => {
    removeLoading();
    document.querySelector("form").reset();
    alert("Successful registration");

    const spans = document.querySelectorAll(".span-active");
    spans.forEach((span) => span.classList.remove("span-active"));
  });
};

document.querySelector("form").addEventListener("submit", handleSubmit);

const inputs = document.querySelectorAll(".input");

const handleFocus = ({ target }) => {
  const span = target.previousElementSibling;
  span.classList.add("span-active");
};

const handleFocusOut = ({ target }) => {
  if (target.value === "") {
    const span = target.previousElementSibling;
    span.classList.remove("span-active");
  }
};

inputs.forEach((input) => input.addEventListener("focus", handleFocus));
inputs.forEach((input) => input.addEventListener("focusout", handleFocusOut));
