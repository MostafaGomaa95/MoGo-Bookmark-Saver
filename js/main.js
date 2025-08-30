// Inputs
var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteURLInput = document.getElementById("websiteURL");
// Table
var tableData = document.getElementById("tableBody");
// Utilities Vaiables
var isUpdating = false;
var currentBookMark = null;
var currentIndex = null;
var addBtn = document.getElementById("addBtn");
var saveBtn = document.getElementById("saveBtn");
// List of Weblinks
var linkList = [];
var linkKey = "web links";
var localData = JSON.parse(localStorage.getItem(linkKey));
if (localData != null) {
  linkList = localData;
  displayLink(linkList);
}

// User Entry
var userBookmark = "";
var userURL = "";
var isBookmark = false;
var isURL = false;

// Validations
var urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/;

function isValidURL(url) {
  return urlRegex.test(url);
}
function validateBookmark() {
  var exists = false;
  if (isUpdating) {
    exists = linkList.some(
      (obj) =>
        obj.linkName.toLowerCase() === bookmarkNameInput.value.toLowerCase() &&
        currentBookMark.toLowerCase() !== bookmarkNameInput.value.toLowerCase()
    );
  } else {
    exists = linkList.some(
      (obj) =>
        obj.linkName.toLowerCase() === bookmarkNameInput.value.toLowerCase()
    );
  }

  if (exists) {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");
    isBookmark = false;
  } else {
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    isBookmark = true;
  }
}

function validateURL() {
  if (isValidURL(websiteURLInput.value)) {
    websiteURLInput.classList.add("is-valid");
    websiteURLInput.classList.remove("is-invalid");
    isURL = true;
  } else {
    websiteURLInput.classList.add("is-invalid");
    websiteURLInput.classList.remove("is-valid");
    isURL = false;
  }
}

// Add
function addLink() {
  var linkObject = {
    linkName: bookmarkNameInput.value,
    linkURL: websiteURLInput.value,
  };

  if (isURL && isBookmark) {
    linkList.push(linkObject);
    setStorage(linkList);
    displayLink(linkList);
    clearInput();
  }
}
// Display
function displayLink(list) {
  var bodyContent = "";
  for (var i = 0; i < list.length; i++) {
    bodyContent += `
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${list[i].linkName} <span class="ms-2">
                    
                    </span></td>
                    <td>
                    <a class="btn btn-warning border-1 px-3 py-2 nav-link" target="_blank" href="${
                      list[i].linkURL
                    }"><i class="fa-solid fa-eye me-2"></i>  Visit</a>
                    </td>

                    <td>
                    <button onclick="updateItem(${i})" type="button" class="btn btn-outline-secondary border-1  px-3 py-2 text-center">
                   <i class="fa-solid fa-pen"></i></button>
                    </td>

                    <td>
                    <button onclick="removeItem(${i})" type="button" class="btn btn-danger border-1  px-3 py-2">
                   <i class="fa-solid fa-trash me-2"></i>  Delete </button>
                    </td>
                </tr>
        `;
  }
  tableData.innerHTML = bodyContent;
}
// Delete
function removeItem(index) {
  if (!isUpdating) {
    linkList.splice(index, 1);
    setStorage(linkList);
    displayLink(linkList);
  }
}
// Update
function updateItem(index) {
  isUpdating = true;
  currentIndex = index;
  currentBookMark = linkList[currentIndex].linkName;
  bookmarkNameInput.value = linkList[currentIndex].linkName;
  websiteURLInput.value = linkList[currentIndex].linkURL;
  saveBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}
function saveList() {
  var currentBookmarkVal = linkList[currentIndex].linkName;
  var currentURLVal = linkList[currentIndex].linkURL;
  linkList[currentIndex].linkName = bookmarkNameInput.value;
  linkList[currentIndex].linkURL = websiteURLInput.value;

  if (
    bookmarkNameInput.value.toLowerCase() == currentBookmarkVal.toLowerCase()
  ) {
    isBookmark = true;
  }
  if (websiteURLInput.value.toLowerCase() == currentURLVal.toLowerCase()) {
    isURL = true;
  }

  if (isURL && isBookmark) {
    addBtn.classList.remove("d-none");
    saveBtn.classList.add("d-none");
    currentIndex = null;
    isUpdating = false;

    displayLink(linkList);
    setStorage(linkList);
    clearInput();
  }
}

/* === Helping Methods === */
function setStorage(list) {
  var listAsString = JSON.stringify(list);
  localStorage.setItem(linkKey, listAsString);
}
function clearInput() {
  bookmarkNameInput.value = "";
  websiteURLInput.value = "";
  bookmarkNameInput.classList.remove("is-invalid");
  bookmarkNameInput.classList.remove("is-valid");
  websiteURLInput.classList.remove("is-invalid");
  websiteURLInput.classList.remove("is-valid");
  isBookmark = false;
  isURL = false;
}
