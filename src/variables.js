// Everything a school can change (see SCHOOL_SETUP.md). Reload the extension and WebUntis after a change

const VARIABLES = {
  // ---------- Emoji ----------

  // The emoji Until uses when nobody picked one in the popup yet
  defaultEmoji: "🪑",

  // The emojis you can pick from in the popup (8 per row)
  emojiChoices: [
    "🪑",
    "🧹",
    "🧽",
    "🧼",
    "🗑️",
    "✨",
    "📚",
    "✏️",
    "🔔",
    "⏰",
    "📌",
    "⚠️",
    "🚨",
    "✅",
    "❗",
  ],

  // The glow color when the lesson is about to end, any CSS color works
  glowColor: "rgb(255, 0, 0)",

  // The color of the border around the lesson in the timetable, any CSS color works
  borderColor: "rgb(255, 109, 51)",

  // How thick that border is, any CSS size works (e.g. "2.5px")
  borderThickness: "3px",

  // ---------- Default settings ----------
  // The popup's starting values, a student's own changes are kept

  // The switches in the popup. true = on, false = off
  switches: {
    notification: true, // system notification before the lesson ends
    alert: true, // alert on the WebUntis page before the lesson ends
    taskbar: true, // emoji in the WebUntis sidebar
    border: true, // Border around the lesson
  },

  // The number fields in the popup: starting value, lowest and highest number
  minutes: {
    // Remind me ... minutes before the lesson ends
    remindMinutes: { default: 5, min: 0, max: 60 },
    // The emoji glows ... minutes before the lesson ends
    showMinutes: { default: 48, min: 0, max: 100 },
  },

  // ---------- Texts ----------
  // The alert and notification texts, one block per language
  //
  // A text is a string or a list of lines ("" = empty line). All placeholders are optional:
  //
  //   {emoji}        the emoji the student picked
  //   {room}         the room, e.g. "404"
  //   {subject}      the subject, e.g. "E"
  //   {teacher}      the teacher's short name, e.g. "DOE"
  //   {class}        the class, e.g. "2A"
  //   {start}        when the lesson starts, e.g. "12:00"
  //   {end}          when the lesson ends, e.g. "12:50"
  //   {minutesLeft}  minutes until the lesson ends, e.g. "5"
  //
  // If WebUntis doesn't know a value (e.g. a lesson without a teacher), it shows "?".

  fallbackLanguage: "en",

  texts: {
    // !!For translating copy the en section!!
    en: {
      // The pop-up on the WebUntis page
      alert: [
        "{emoji} Chairs up!",
        "",
        "You're the last class in room {room} today.",
        "Please leave the room tidy and don't forget to close the windows, clean the board and put the chairs on the tables.",
        "",
        "Lesson: {subject} with {teacher}",
        "Time: {start}-{end}",
        "Ends in: {minutesLeft} min",
      ],

      // The system notification (keep it short, long text gets cut off)
      notificationTitle:
        "{emoji} Chairs up - room {room} ends in {minutesLeft} min",
      notification: [
        "{subject} with {teacher} ends at {end}.",
        "Close the windows, clean the board, chairs on the tables.",
      ],
    },

    de: {
      alert: [
        "{emoji} Sessel hoch!",
        "",
        "Ihr seid heute die letzte Klasse im Raum {room}.",
        "Bitte verlasst den Raum ordentlich und vergesst nicht, die Fenster zu schließen, die Tafel zu putzen und die Sessel auf die Tische zu stellen.",
        "",
        "Stunde: {subject} bei {teacher}",
        "Zeit: {start}-{end}",
        "Endet in: {minutesLeft} Min.",
      ],

      notificationTitle:
        "{emoji} Sessel hoch - Raum {room} endet in {minutesLeft} Min.",
      notification: [
        "{subject} bei {teacher} endet um {end}.",
        "Fenster zu, Tafel putzen, Sessel auf die Tische.",
      ],
    },
  },
};
