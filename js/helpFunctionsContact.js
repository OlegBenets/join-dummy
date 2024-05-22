function setErrorBorder(elements) {
    elements.classList.add("error");
  }
  
  function removeErrorBorder(elements) {
    elements.classList.remove("error");
  }
  
  function testAddContactsInput() {
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const telInput = document.getElementById("contact-tel");
  
    let isNameValid = validateTextLenght(nameInput.value, 3, 18);
    let isEmailValid =validateTextLenght(emailInput.value, 5, 25);
    let isTelValid = validateNumberLength(telInput.value, 3, 12);
    checkInputValidation(isNameValid, isEmailValid, isTelValid, nameInput, emailInput, telInput);
  }

  function validateTextLenght(value, minlength, maxlength) {
    return value.trim().length >= minlength && value.trim().length <= maxlength;
  }

  function validateNumberLength(value, minlength, maxlength) {
    let numValue = value.trim();
    return numValue.length >= minlength && numValue.length <= maxlength && /^\d{3,12}$/.test(numValue);
  }
  
  function checkInputValidation(isNameValid, isEmailValid, isTelValid, nameInput, emailInput, telInput) {
  validateInput(isNameValid, nameInput, "name-error");
  validateInput(isEmailValid, emailInput, "email-error");
  validateInput(isTelValid, telInput, "tel-error");
  }
  
  function validateInput(isValid, inputElement, errorElementId) {
    let errorElement = document.getElementById(errorElementId);
    let errorText = errorElement.querySelector(".error-text");
  
    if (!isValid) {
      setErrorBorder(inputElement.parentElement);
      errorText.style.display = "block";
    } else {
      removeErrorBorder(inputElement.parentElement);
      errorText.style.display = "none";
    }
  }