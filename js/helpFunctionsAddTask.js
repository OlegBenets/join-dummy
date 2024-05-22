function setFocusedBorder(element) {
    element.classList.add("focused");
  }
  
  function setErrorBorder(elements) {
    elements.classList.add("error");
  }
  
  function removeErrorBorder(elements) {
    elements.classList.remove("error");
  }
  
  function testTask() {
    const titleInput = document.getElementById("input-title");
    const dateInput = document.getElementById("input-date");
    const categoryInput = document.getElementById("input-category");
  
    let isTitleValid = titleInput.value.trim() !== "";
    let isDateValid = dateInput.value.trim() !== "";
    let isCategoryValid = categoryInput.value.trim() !== "";
    checkInputValidation(isTitleValid, isDateValid, isCategoryValid, titleInput, dateInput, categoryInput);
  }
  
  function checkInputValidation(isTitleValid, isDateValid, isCategoryValid, titleInput, dateInput, categoryInput) {
  validateInput(isTitleValid, titleInput, "title-error");
  validateInput(isDateValid, dateInput, "date-error");
  validateInput(isCategoryValid, categoryInput, "category-error");
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
  
  function setEventlister() {
    let inputLeft = document.getElementById("title-container").parentElement.querySelectorAll(".add-task-input-container");
    let inputRight = document.getElementById("date-container").parentElement.querySelectorAll(".add-task-input-container");
    let inputs = [inputLeft, inputRight];
    for (let j = 0; j < inputs.length; j++) {
      const nodeList = inputs[j];
      for (let i = 0; i < nodeList.length; i++) {
        const element = nodeList[i].children[0];
        element.addEventListener("focus", (event) => {
          setBorder(event);
        });
        element.addEventListener("blur", (event) => {
          unsetBorder(event);
        });
      }
    }
  }
  
  function setBorder(event) {
    let target = event.target;
    target.parentElement.classList.add("focused");
  }
  
  function unsetBorder(event) {
    let target = event.target;
    target.parentElement.classList.remove("focused");
  }