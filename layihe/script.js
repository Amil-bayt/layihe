let sortDirection = "asc"; // 'asc' = A-Z, 'desc' = Z-A
let notes = [];

document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("add-btn");
  const plusBtn = document.querySelector(".plus");
  const noteInput = document.getElementById("note");
  const notesContainer = document.querySelector(".notes");
  const inputContainer = document.querySelector(".input-container");
  const sortIcon = document.getElementById("sort-btn");

  addBtn.addEventListener("click", function () {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
      notes.push(noteText);
      noteInput.value = "";
      inputContainer.classList.add("hidden");
      renderNotes();
    }
  });

  plusBtn.addEventListener("click", function () {
    inputContainer.classList.remove("hidden");
    noteInput.focus();
  });

  // Sort icon kliklə dəyiş
  sortIcon.addEventListener("click", function () {
    if (sortDirection === "asc") {
      sortDirection = "desc";
      sortIcon.src = "images/sortupwhite.svg"; // Yuxarıdan
    } else {
      sortDirection = "asc";
      sortIcon.src = "images/sortdownwhite.svg"; // Aşağıdan
    }
    renderNotes(); 
  });

  // Hover effekti
  sortIcon.addEventListener("mouseover", function () {
    if (sortDirection === "asc") {
      sortIcon.src = "images/sortdownblack.svg"; 
    } else {
      sortIcon.src = "images/sortupblack.svg"; 
    }
  });

  sortIcon.addEventListener("mouseout", function () {
    if (sortDirection === "asc") {
      sortIcon.src = "images/sortdownwhite.svg";
    } else {
      sortIcon.src = "images/sortupwhite.svg";
    }
  });


  function renderNotes() {
    notesContainer.innerHTML = "";
    let sortedNotes = [...notes];

    sortedNotes.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });

    sortedNotes.forEach((text) => {
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";

      const noteText = document.createElement("span");
      noteText.textContent = text;

      const deleteIcon = document.createElement("img");
      deleteIcon.src = "images/xwhite.svg";
      deleteIcon.alt = "Sil";
      deleteIcon.className = "delete-icon";

      deleteIcon.addEventListener("mouseover", () => {
        deleteIcon.src = "images/xhover.svg";
      });
      deleteIcon.addEventListener("mouseout", () => {
        deleteIcon.src = "images/xwhite.svg";
      });

      deleteIcon.addEventListener("click", () => {
        notes = notes.filter((note) => note !== text);
        renderNotes();
      });

      noteItem.appendChild(noteText);
      noteItem.appendChild(deleteIcon);
      notesContainer.appendChild(noteItem);
    });
  }
});
