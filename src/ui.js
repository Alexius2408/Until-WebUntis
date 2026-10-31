// Visual behavior only, saving and loading lives in script.js.
const emojiInput = document.getElementById("emoji-input");
const emojiRow = document.getElementById("emoji-label");
const picker = document.getElementById("emoji-picker");
const pickerGrid = picker.querySelector(".picker__grid");
const FALLBACK_EMOJI = VARIABLES.defaultEmoji;

emojiInput.placeholder = FALLBACK_EMOJI;

/* ---------- Translations ---------- */

// The browser picks the language from _locales/ (English if it has no file for it)
document.documentElement.lang = ext.i18n.getUILanguage();

document.querySelectorAll("[data-i18n]").forEach((element) => {
  const text = ext.i18n.getMessage(element.dataset.i18n);
  element.textContent = text;
  element.hidden = text === "";
});

document.querySelectorAll("[data-i18n-label]").forEach((element) => {
  element.setAttribute(
    "aria-label",
    ext.i18n.getMessage(element.dataset.i18nLabel),
  );
});

/* ---------- Small effects ---------- */

function pop(element) {
  element.classList.remove("is-popping");
  void element.offsetWidth; // restart the animation
  element.classList.add("is-popping");
}

function showEmoji(emoji) {
  pickerGrid.querySelectorAll(".picker__emoji").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.emoji === emoji));
  });
}

/* ---------- Emoji picker ---------- */
let buttons = [];

async function drawEmoji() {
  // The emojis to choose from are in variables.js
  const data = await ext.storage.local.get({
    Emoji_array: VARIABLES.emojiChoices,
  });
  const emojis = data.Emoji_array;

  pickerGrid.innerHTML = "";

  emojis.forEach((emoji, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "picker__emoji";
    button.dataset.emoji = emoji;
    button.style.setProperty("--i", i);
    button.setAttribute("aria-pressed", String(emoji === emojiInput.value));
    button.tabIndex = -1;
    const glyph = document.createElement("span");
    glyph.textContent = emoji;
    button.append(glyph);
    pickerGrid.append(button);
  });

  // The buttons only exist now, so update the list used by the arrow keys
  buttons = [...pickerGrid.querySelectorAll(".picker__emoji")];
}

drawEmoji();

function isOpen() {
  return picker.hasAttribute("data-open");
}

function openPicker(focusGrid = false) {
  showEmoji(emojiInput.value);

  picker.setAttribute("data-open", "");
  picker.inert = false;
  emojiInput.setAttribute("aria-expanded", "true");

  if (focusGrid) {
    (
      buttons.find((b) => b.dataset.emoji === emojiInput.value) || buttons[0]
    ).focus();
  }
}

function closePicker(returnFocus = false) {
  if (!isOpen()) return;
  picker.removeAttribute("data-open");
  picker.inert = true;
  emojiInput.setAttribute("aria-expanded", "false");
  if (returnFocus) emojiInput.focus();
}

function choose(emoji) {
  emojiInput.value = emoji;
  // Same event as typing/pasting, so script.js saves it
  emojiInput.dispatchEvent(new Event("input", { bubbles: true }));
  closePicker(true);
}

// Clicking the row or the tile toggles the picker (the label forwards clicks to the input)
emojiInput.addEventListener("click", () =>
  isOpen() ? closePicker() : openPicker(),
);

emojiInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "Enter") {
    event.preventDefault();
    openPicker(true);
  } else if (event.key === "Escape" && isOpen()) {
    event.preventDefault();
    closePicker();
  }
});

pickerGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".picker__emoji");
  if (button) choose(button.dataset.emoji);
});

// Close when clicking or tabbing somewhere else
document.addEventListener("pointerdown", (event) => {
  if (
    isOpen() &&
    !picker.contains(event.target) &&
    !emojiRow.contains(event.target)
  ) {
    closePicker();
  }
});

picker.addEventListener("focusout", (event) => {
  if (
    !picker.contains(event.relatedTarget) &&
    event.relatedTarget !== emojiInput
  ) {
    closePicker();
  }
});

/* ---------- Number rows ---------- */

// A number row only shows while at least one switch in its list is on
const numberLists = document.querySelectorAll(".list:has(.row--number)");

function updateNumberRows() {
  numberLists.forEach((list) => {
    const switches = [...list.querySelectorAll(".switch-input")];
    const anyOn = switches.some((element) => element.checked);
    list.querySelector(".row--number").hidden = !anyOn;
  });
}

numberLists.forEach((list) =>
  list.addEventListener("change", updateNumberRows),
);

ext.storage.local.get(null).then(updateNumberRows);

/* ---------- Feedback ---------- */

// script.js filters the input first, so read the value after it
emojiInput.addEventListener("input", () => {
  const emoji = emojiInput.value;
  if (emoji) {
    pop(emojiInput);
  }
  showEmoji(emoji);
});

// Show the saved emoji in the heading and picker when the popup opens
ext.storage.local.get({ emoji: "" }).then((data) => {
  if (emojiInput.value === data.emoji) {
    showEmoji(emojiInput.value);
  }
});
