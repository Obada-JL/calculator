const toggle_element = document.querySelector(".themes__toggle");
const toggle_dark_theme = () => {
  toggle_element.classList.toggle("themes__toggle--isActive");
};

toggle_element.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    toggle_dark_theme();
  }
});
toggle_element.addEventListener("click", toggle_dark_theme);

//logic

let stored_number = "";
let current_number = "";
let operation = "";

const result_element = document.querySelector(".calc__result");
const key_elements = document.querySelectorAll("[data-type]");

const update_screen = (value) => {
  result_element.innerText = !value ? "0" : value;
};
const number_button_handler = (value) => {
  if (value === "." && current_number.includes(".")) return;
  if (value === "0" && !current_number) return;
};
key_elements.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.dataset.type === "number") {
      const value = element.dataset.value;

      current_number += value;

      update_screen(current_number);
    }
  });
});

const reset_button_handler = () => {
  stored_number = "";
  current_number = "";
  operation = "";
  update_screen(current_number);
};

const delete_button_handler = () => {
  if (!current_number || current_number === "0") return;
  console.log(current_number);
  if (current_number.toString().length === 1) {
    current_number = "";
  } else {
    current_number = current_number.substring(0, current_number.length - 1);
  }
  update_screen(current_number);
};
excute_operation = () => {
  if (current_number && stored_number && operation) {
    switch (operation) {
      case "+":
        stored_number = parseFloat(stored_number) + parseFloat(current_number);
        break;
      case "-":
        stored_number = parseFloat(stored_number) - parseFloat(current_number);
        break;
      case "*":
        stored_number = parseFloat(stored_number) * parseFloat(current_number);
        break;
      case "/":
        stored_number = parseFloat(stored_number) / parseFloat(current_number);
        break;
    }
    current_number = "";
    update_screen(stored_number);
  }
  console.log(excute_operation);
};
const operation_button_handler = (operation_value) => {
  if (!stored_number && !current_number) return;

  if (current_number && !stored_number) {
    stored_number = current_number;
    current_number = "";
    operation = operation_value;
  } else if (stored_number) {
    operation = operation_value;

    if (current_number) excute_operation;
  }
};
const key_element_handler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;

    if (type === "number") {
      number_button_handler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          reset_button_handler();
          break;
        case "Backspace":
          delete_button_handler();
          break;
        case "Enter":
          excute_operation();
        default:
          operation_button_handler(element.dataset.value);
      }
    }
  });
};
key_elements.forEach(key_element_handler);

//keyboard
const avalible_numbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const avalible_operations = ["+", "-", "*", "/"];
const avalible_keys = [
  ...avalible_numbers,
  ...avalible_operations,
  "Backspace",
  "Enter",
  "c",
];

window.addEventListener("keydown", (event) => {
  keyboard_with_hover(event.key);
});
const keyboard_without_hover = (key) => {
  if (avalible_numbers.includes(key)) {
    number_button_handler;
  } else if (avalible_operations.includes(key)) {
    operation_button_handler(key);
  } else if (key === "Backspace") {
    delete_button_handler();
  } else if (key === "Enter") {
    excute_operation();
  } else if (key === "c") {
    reset_button_handler();
  }
};
const keyboard_with_hover = (key) => {
  if (avalible_keys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 100);
  }
};
