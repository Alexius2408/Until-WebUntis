const ext = globalThis.browser ?? globalThis.chrome;

const textinput = document.getElementById("emoji-input");
const numberInputs = document.querySelectorAll('input[type="number"]');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const emojiPattern = /\p{RGI_Emoji}/gv;

// Takes a text and returns a list with only the emojis in it
function getEmojis(text) {
  return text.match(emojiPattern) ?? [];
}

// When the popup opens: restore the saved emoji
ext.storage.local.get({ emoji: "" }).then((data) => {
  textinput.value = data.emoji;
});

// When it changes: filter it and save it
textinput.addEventListener("input", () => {
  const emojis = getEmojis(textinput.value);
  const emoji = emojis.length > 0 ? emojis[emojis.length - 1] : ""; // keep only the last one

  textinput.value = emoji;
  ext.storage.local.set({ emoji });
});

// Only when something is pasted
textinput.addEventListener("paste", async (event) => {
  event.preventDefault();

  const pasted = event.clipboardData.getData("text"); // exactly what was pasted
  const pastedEmojis = getEmojis(pasted);

  if (pastedEmojis.length === 0) return; // no emoji pasted, keep the old one

  const pastedEmoji = pastedEmojis.at(-1); // the emoji that was pasted

  textinput.value = pastedEmoji;
  const data = await ext.storage.local.get({ Emoji_array: VARIABLES.emojiChoices });
  const emojis = data.Emoji_array;

  if (emojis[0] !== pastedEmoji) {
    if (emojis.length > VARIABLES.emojiChoices.length) {
      emojis[0] = pastedEmoji; // pasted before (one extra emoji), replace the first one
    } else {
      emojis.unshift(pastedEmoji); // first paste, the others get pushed back
    }

    await ext.storage.local.set({ Emoji_array: emojis });
    await drawEmoji();
  }

  textinput.dispatchEvent(new Event("input", { bubbles: true })); // save + animation
});

checkboxes.forEach((element) => {
  // Restore the saved state when the popup opens (the default is in variables.js)
  ext.storage.local.get({ [element.id]: VARIABLES.switches[element.id] ?? true }).then((data) => {
    element.checked = data[element.id];
  });

  // Save when it changes
  element.addEventListener("change", () => {
    ext.storage.local.set({ [element.id]: element.checked });
  });
});

numberInputs.forEach((element) => {
  // The default, lowest and highest number come from variables.js
  const field = VARIABLES.minutes[element.id];
  if (field) {
    element.value = field.default;
    element.min = field.min;
    element.max = field.max;
  }

  let lastValue = element.value; // the last value that was inside min/max

  // Restore the saved value when the popup opens (the value set above is the default)
  ext.storage.local.get({ [element.id]: Number(element.value) }).then((data) => {
    element.value = data[element.id];
    lastValue = element.value;
  });

  // Save on every keystroke and arrow click
  element.addEventListener("input", () => {
    if (element.value === "") return; // field cleared while typing, wait for a number

    const number = Number(element.value);
    if (number > Number(element.max) || number < Number(element.min)) {
      element.value = lastValue; // too big or too small, undo the last key
      return;
    }

    lastValue = element.value;
    ext.storage.local.set({ [element.id]: number });
  });
});


// When opening the GitHub links, the popup should close automatically. Can't use target="_blank", because then it opens a new window
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    await ext.tabs.create({ url: link.href });
    window.close();
  });
});