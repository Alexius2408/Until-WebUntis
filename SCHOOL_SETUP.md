# Setting up Until for your school

Every school is a bit different. Maybe your students don't put chairs up, maybe they have to switch off the lights, or maybe you want the default reminder earlier. You can change all of that in **one file: [`variables.js`](src/variables.js)**. You don't need to know JavaScript or any programming skills for that. Just a bit of time.

## Contents

- [Before you start](#before-you-start)
- [What you can change](#what-you-can-change)
  - [The emoji](#the-emoji)
  - [The border](#the-border)
  - [Default settings](#default-settings)
  - [The alert and notification texts](#the-alert-and-notification-texts)
    - [Placeholders](#placeholders)
    - [Example: a short alert](#example-a-short-alert)
    - [Example: a longer alert with a checklist](#example-a-longer-alert-with-a-checklist)
  - [Languages](#languages)
- [What isn't in variables.js](#what-isnt-in-variablesjs)
- [Sharing your version](#sharing-your-version)

## Before you start

1. [Download this repository](../../archive/refs/heads/main.zip) and unzip it.
2. Open `variables.js` in any text editor. Notepad works, but [VS Code](https://code.visualstudio.com/) shows mistakes in color, so it's easier.
3. Change what you want (see below) and save.
4. Load the extension like in the [README](README.md#installation). If it's already loaded, click the **reload arrow** on Until in `chrome://extensions` (in Firefox, load it again), then reload WebUntis.

> **Careful with commas and quotes.** Text always goes between `"quotes"`, and every line in a list or block ends with a comma `,`. If Until stops working after a change, a missing comma or quote is almost always the reason.

## What you can change

### The emoji

```js
defaultEmoji: "🪑",
```

The emoji Until shows when a student hasn't picked one yet. Students can still choose their own in the popup.

```js
emojiChoices: [
  "🪑", "🧹", "🧽", "🧼", "🗑️", "✨", "📚", "✏️",
  "🔔", "⏰", "📌", "⚠️", "🚨", "✅", "❗",
],
```

The emojis students can pick from in the popup. The popup shows 8 per row. You can add some, remove some, or change the order.

> Students who already pasted their own emoji into the popup keep their old list. They only see your new list after reinstalling the extension.

```js
glowColor: "rgb(255, 0, 0)",
```

The color the emoji glows in when the lesson is about to end. Any CSS color works, for example `"red"`, `"#00aaff"` or `"orange"`.

If you don't know what a specific color looks like, open the [Google Color Picker](https://www.google.com/search?q=hex+color+picker), pick a color you like, then click the copy button next to **HEX**. Paste the value between the quotes, for example `glowColor: "#ff6600",`.

### The border

The last lesson in a room gets a border in the WebUntis timetable.

```js
borderColor: "rgb(255, 109, 51)",
borderThickness: "3px",
```

- **`borderColor`**: the color of the border. Any CSS color works, just like for `glowColor`.
- **`borderThickness`**: how thick the border is. Any CSS size works, for example `"2px"` or `"2.5px"`.

Students can switch the border on or off in the popup. Whether it starts on is set by `border` under [Default settings](#default-settings).

### Default settings

These are the settings a student starts with. Once a student changes a setting in the popup, their own choice is kept.

```js
switches: {
  notification: true, // system notification before the lesson ends
  alert: true,        // alert on the WebUntis page before the lesson ends
  taskbar: true,      // emoji in the WebUntis sidebar
  border: true,       // border around the lessons in WebUntis
},
```

`true` means the switch starts on, `false` means it starts off. For example, if the pop-up alert is too annoying for your school and the notification is enough, set `alert: false`.

```js
minutes: {
  remindMinutes: { default: 5, min: 0, max: 60 },
  showMinutes: { default: 48, min: 0, max: 100 },
},
```

- **`remindMinutes`**: how many minutes before the end of the lesson the reminder comes. `0` means right when the lesson ends.
- **`showMinutes`**: how many minutes before the end the emoji in the sidebar starts to glow. `0` means it never glows.
- **`default`** is the starting value. **`min`** and **`max`** are the lowest and highest numbers a student can type into the popup.

Example: your lessons are 45 minutes long, and the reminder should come 10 minutes before the end:

```js
remindMinutes: { default: 10, min: 0, max: 45 },
showMinutes: { default: 45, min: 0, max: 45 },
```
<br/>


> Be careful with lowering `max` to your lesson length. Students often have two lessons in a row (a double lesson, around 90 minutes), and some want the sidebar emoji to glow for the whole time. That's why the default `max` for `showMinutes` is `100`. If your school has double lessons, keep it at least that high.


### The alert and notification texts

This is probably what you'll change most. There are three texts per language. You usually only need to change `en` (English) and the language your school speaks:


| Name                | Where it shows up                                     |
| ------------------- | ----------------------------------------------------- |
| `alert`             | The pop-up on the WebUntis page                       |
| `notificationTitle` | The bold first line of the system notification        |
| `notification`      | The text under it (keep it short, it gets cut off)    |

A text can be **one line**:

```js
notificationTitle: "{emoji} Chairs up!",
```

or a **list of lines**, where `""` is an empty line:

```js
alert: [
  "{emoji} Chairs up!",
  "",
  "You're the last class in room {room} today.",
],
```

Instead of a list, you can also write everything in one line. `\n` (instead of "") starts a new line, and `\n\n` (instead of "", "") adds an empty line (the same as `""` in a list):

```js
alert: "{emoji} Chairs up!\n\nYou're the last class in room {room} today.",
```

Both versions show exactly the same alert. Use whichever is easier for you to read. Make sure to use a backslash (`\n`), not a forward slash (`/n`).

#### Placeholders

The words in `{curly brackets}` are replaced with the real values of the lesson. **None of them are required.** Use the ones you want, in any order, as often as you like, or none at all.

| Placeholder     | Becomes                             | Example |
| --------------- | ----------------------------------- | ------- |
| `{emoji}`       | The emoji the student picked        | 🪑      |
| `{room}`        | The room                            | 404     |
| `{subject}`     | The subject                         | E       |
| `{teacher}`     | The teacher's short name            | DOE     |
| `{class}`       | The class                           | 2A      |
| `{start}`       | When the lesson starts              | 12:00   |
| `{end}`         | When the lesson ends                | 12:50   |
| `{minutesLeft}` | Minutes until the lesson ends       | 5       |

If WebUntis doesn't have a value (for example a lesson without a teacher), it shows `?`. If you mistype a placeholder, like `{rom}`, it shows up exactly like that in the alert, so you can spot it right away.

#### Example: a short alert

You don't need the lesson details, only the essentials. Here `""` adds an empty line between the two lines:

```js
alert: [
  "{emoji} Last class in {room}!",
  "",
  "Chairs up and lights off, please.",
],
```

#### Example: a longer alert with a checklist

This one uses `\n` instead of a list. The `+` joins the pieces into one text, so you can still spread it over several lines:

```js
alert:
  "{emoji} Last class in room {room} today!\n\n" +
  "Before you leave:\n" +
  "- Chairs on the tables\n" +
  "- Windows closed\n" +
  "- Board cleaned\n" +
  "- Lights off\n\n" +
  "{subject} ends at {end} (in {minutesLeft} min).",
```

### Languages

Until uses the language of the browser. Every language has its own block in `texts`:

```js
fallbackLanguage: "en",

texts: {
  en: { alert: [...], notificationTitle: "...", notification: [...] },
  de: { alert: [...], notificationTitle: "...", notification: [...] },
},
```

- **To add a language**, copy the whole `en: { ... },` block, rename `en` to the [language code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) (for example `fr`, `es` or `it`) and translate the texts. Leave the `{placeholders}` as they are.
- **`fallbackLanguage`** is used when there is no block for the browser's language.
- If a language block is missing one of the three texts, Until takes that text from the fallback language.

The texts in the **popup** (like "Remind me" or "Show Borders") aren't in `variables.js` but in [`_locales/`](_locales/), one folder per language. For a full translation you need both. How to do that is in the [README](README.md#languages).

If you translate Until into a new language, please send it to me so everyone can use it!

## What isn't in variables.js

Some things are deeper in the code or in other files:

- **Popup texts**: in `_locales/<language>/messages.json`.
- **The icon**: the files in `src/icons/`.
- **The WebUntis address**: Until runs on every `*.webuntis.com` page. If your school uses WebUntis on a different domain, change both `"matches"` lines in `manifest.json`.

## Sharing your version

You can share your changed version with your school for free. You just can't sell it. See the [license](LICENSE).
