const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-modal-post");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const editForm = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const aboutInput = editProfileModal.querySelector("#profile-description-input");
const editSubmit = editProfileModal.querySelector(".modal__submit-btn");

const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmit = newPostModal.querySelector(".modal__submit-btn");

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileAbout.textContent.trim();
  editSubmit.disabled = !editForm.checkValidity();
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostSubmit.disabled = !newPostForm.checkValidity();
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  editProfileModal.classList.remove("modal_is-opened");
  editForm.reset();
});

newPostForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(newPostForm).entries());
  console.log("New Post form:", data);
  newPostModal.classList.remove("modal_is-opened");
  newPostForm.reset();
});

editForm.addEventListener("input", function () {
  editSubmit.disabled = !editForm.checkValidity();
});

newPostForm.addEventListener("input", function () {
  newPostSubmit.disabled = !newPostForm.checkValidity();
});
