// Initialize state from LocalStorage or empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Render notes list to DOM
function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML = '<p style="color: #666;">No notes saved yet.</p>';
    return;
  }

  notes.forEach(function (note, index) {
    const card = document.createElement("div");
    card.className = "note-item";

    card.innerHTML = `
      <div>
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.body)}</p>
      </div>
      <div>
        <button type="button" class="btn-edit" onclick="editNote(${index})">Edit</button>
        <button type="button" class="btn-delete" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;

    notesList.appendChild(card);
  });
}

// Persist notes to localStorage
function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Prevent script injection attacks when rendering text
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (match) {
    const escapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return escapes[match];
  });
}

// Global Edit Handler
function editNote(index) {
  document.getElementById("note-title").value = notes[index].title;
  document.getElementById("note-body").value = notes[index].body;
  document.getElementById("note-index").value = index;
  document.getElementById("form-title").textContent = "Edit Note";
  document.getElementById("save-btn").textContent = "Update Note";
  document.getElementById("note-title").focus();
}

// Global Delete Handler
function deleteNote(index) {
  notes.splice(index, 1);

  // If currently editing the deleted note, reset the form
  const currentIndex = parseInt(document.getElementById("note-index").value, 10);
  if (currentIndex === index) {
    resetForm();
  }

  saveToStorage();
  displayNotes();
}

// Helper to reset form state
function resetForm() {
  document.getElementById("note-form").reset();
  document.getElementById("note-index").value = "-1";
  document.getElementById("form-title").textContent = "Add Note";
  document.getElementById("save-btn").textContent = "Save Note";
}

// Form Submit Event Handler
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("note-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const titleInput = document.getElementById("note-title");
    const bodyInput = document.getElementById("note-body");
    const indexInput = document.getElementById("note-index");

    const index = parseInt(indexInput.value, 10);

    if (index === -1) {
      notes.push({
        title: titleInput.value.trim(),
        body: bodyInput.value.trim()
      });
    } else {
      notes[index].title = titleInput.value.trim();
      notes[index].body = bodyInput.value.trim();
    }

    resetForm();
    saveToStorage();
    displayNotes();
  });

  // Initial load
  displayNotes();
});
