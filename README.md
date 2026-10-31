<div align="center">

<img src="src/icons/icon.svg" width="96" alt="Until logo" />

<div align="center">
  <span style="font-size: 2.7em; font-weight: bold;">Until</span>
</div>
<br>
<a href="https://addons.mozilla.org/firefox/addon/until-webuntis/reviews/"><img alt="Mozilla Add-on Stars" src="https://img.shields.io/amo/stars/Until-WebUntis%40alexius2408.addon?style=flat&color=FF8C00"></a> <a href="https://github.com/Alexius2408/Until-Webuntis/releases/latest"><img alt="GitHub manifest version" src="https://img.shields.io/github/manifest-json/v/Alexius2408/Until-WebUntis"></a> <a href="https://addons.mozilla.org/firefox/addon/until-webuntis/"><img alt="Mozilla Add-on Downloads" src="https://img.shields.io/amo/dw/Until-WebUntis%40alexius2408.addon"></a>



---


### Know when you're the last class in the room with Until.

<br/>

A browser extension for WebUntis that marks the lessons where nobody uses the room after you, and reminds you before they end.

</div>

---

## Why I built this

At my school, the last class in a room has to put the chairs up before leaving for the day. But to know if you're the last one, you have to open your timetable, find the room, open the room's timetable and check if another class comes after you. Nobody wants to do that every day.

So it often happens that the cleaning staff needs to put the chairs up instead.

That's why a teacher asked me if I wanted to build an extension that does the checking for us.

## How it works

1. **It looks at your timetable.** Until goes through every lesson you have this week.
2. **It checks each room.** It looks at that room's timetable to see if another class comes in after you.
3. **It marks the lesson.** If nobody comes after you, the lesson gets an orange border in your WebUntis timetable.
4. **It reminds you.** A few minutes before the lesson ends, you get a notification.

It runs in your browser, uses your normal WebUntis login and doesn't send your data anywhere.

## Choose your own emoji

The emoji shows up in the WebUntis sidebar and in your reminders. The lessons themselves are marked with a border (you can switch it off in the popup).

1. Click the Until icon in your browser's toolbar.
2. Click the emoji field next to Lesson emoji and pick one from the list.
3. Want one that isn't in the list? Click into the emoji field and either:
   - copy an emoji from anywhere (a chat, [Emojipedia](https://emojipedia.org), Google, ...) and paste it with <kbd>Ctrl</kbd> + <kbd>V</kbd> (Mac: <kbd>⌘</kbd> + <kbd>V</kbd>). It then gets added to the list, so you can switch back to it later.

## Languages

Until comes in **English** and **German**. It shows the correct one depending on your browser's language. Any other language falls back to English.

**Want Until in your language?** Send me a translation and I'll add it! The texts are in two places:

1. **The popup:** copy the `_locales/en` folder and rename it to your language code, for example `_locales/fr` for French or `_locales/es` for Spanish. In its `messages.json`, translate only the `"message"` values. Leave the keys (like `"lessonEmoji"`) as they are.
2. **The alert and notification:** in [`variables.js`](src/variables.js), copy the `en: { ... }` block under `texts`, rename it to your language code and translate it. Leave the `{placeholders}` as they are.
3. Open a [pull request](../../pulls) or an [issue](../../issues) with your files.

## Using Until at your school

Need different texts, emojis or default settings for your school? They're all in [`variables.js`](src/variables.js). How to edit it is in [SCHOOL_SETUP.md](SCHOOL_SETUP.md).

## Screenshots

<div align="center">
<img src="images/timetable.png" width="650" alt="Whole view of the WebUntis page using the extension" /><br />

<br /><br />

<img src="images/lesson.png" width="420" alt="A lesson marked by Until in the WebUntis timetable" /><br />
<p>The last lesson in the room gets a border in your timetable. While that lesson is running, the emoji in the sidebar lights up.</p>

<br /><br />

<img src="images/alert.png" width="420" alt="Alert on the WebUntis page reminding you to put the chairs up" /><br />
<p>A few minutes before the end, you get a reminder.</p>

<br /><br />

<img src="images/settings.png" width="260" alt="Until settings popup" /><br />
<p>Pick your emoji and choose how and when you get reminded.</p>

</div>

## Installation

### Chrome / Edge

1. Download `until-<version>.zip` from the [latest release](https://github.com/Alexius2408/Until-Webuntis/releases/latest) and unzip it.
2. Open Chrome or Edge and type in `chrome://extensions`. Turn on **Developer mode**.
3. Click **Load unpacked** and select the unzipped folder.

> The extension stays installed, even after a restart. Just don't move or delete the folder, because the browser runs it from there.

### Firefox

You can simply download the extension on the Firefox Add-ons site:
[addons.mozilla.org/addon/until-webuntis](https://addons.mozilla.org/addon/until-webuntis/)

<br>

Or if you want to install it manually:

1. Download `until-<version>.xpi` from the [latest release](https://github.com/Alexius2408/Until-Webuntis/releases/latest).
2. Open `about:addons` in Firefox.
3. Click the gear icon ⚙ → **Install Add-on From File…** and select `until-<version>.xpi`.

<br>

## Disclaimer

Until is an independent project and is **not affiliated with or endorsed by Untis GmbH**. Untis and WebUntis are trademarks of Untis GmbH.

Uses [ky](https://github.com/sindresorhus/ky) by Sindre Sorhus (MIT).

## License

[PolyForm Noncommercial 1.0.0](LICENSE) © 2026 alexius2408

You can use, change and share Until for free, as long as you don't make money with it.
