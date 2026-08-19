/**
 * for each task(feature branch) you create a new branch from the main branch and then merge it back into the main branch when the task is complete.
 * This way, you can work on multiple features simultaneously without interfering with each other's work.
 * **/
// Simple array storing notes
var notes = [
  { title: "First Note", body: "This is a simple note." }
];

// Read notes and display them
function displayNotes() {
  var container = document.getElementById("notes-list");
  container.innerHTML = "";

  if (notes.length === 0) {
    container.innerHTML = "<p>No notes found.</p>";
    return;
  }

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var noteDiv = document.createElement("div");
    noteDiv.className = "note-item";

    var h3 = document.createElement("h3");
    h3.textContent = note.title;

    var p = document.createElement("p");
    p.textContent = note.body;

    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn-edit";
    editBtn.setAttribute("onclick", "editNote(" + i + ")");

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn-delete";
    deleteBtn.setAttribute("onclick", "deleteNote(" + i + ")");

    noteDiv.appendChild(h3);
    noteDiv.appendChild(p);
    noteDiv.appendChild(editBtn);
    noteDiv.appendChild(deleteBtn);

    container.appendChild(noteDiv);
  }
}

// Add or Edit note
document.getElementById("note-form").addEventListener("submit", function (event) {
  event.preventDefault();

  var titleInput = document.getElementById("note-title");
  var bodyInput = document.getElementById("note-body");
  var indexInput = document.getElementById("note-index");

  var index = parseInt(indexInput.value);

  if (index === -1) {
    // Add new note
    notes.push({
      title: titleInput.value,
      body: bodyInput.value
    });
  } else {
    // Update existing note
    notes[index].title = titleInput.value;
    notes[index].body = bodyInput.value;
    indexInput.value = "-1";
    document.getElementById("form-title").textContent = "Add Note";
  }

  // Clear inputs
  titleInput.value = "";
  bodyInput.value = "";

  displayNotes();
});

// Edit a note
function editNote(index) {
  document.getElementById("note-title").value = notes[index].title;
  document.getElementById("note-body").value = notes[index].body;
  document.getElementById("note-index").value = index;
  document.getElementById("form-title").textContent = "Edit Note";
}

// Delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  displayNotes();
}

// Initial render
displayNotes();
