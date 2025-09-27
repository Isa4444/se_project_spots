const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__add-btn");
// supports either id (#new-post-modal or #new-modal-post)
const newPostModal =
  document.querySelector("#new-post-modal") ||
  document.querySelector("#new-modal-post");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewCloseBtn =
  imagePreviewModal.querySelector(".modal__close-btn");
const previewImg = imagePreviewModal.querySelector(".modal__image");
const previewCaption = imagePreviewModal.querySelector(".modal__caption");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const editForm = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const aboutInput = editProfileModal.querySelector("#profile-description-input");
const editSubmit = editProfileModal.querySelector(".modal__submit-btn");

const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmit = newPostModal.querySelector(".modal__submit-btn");

const newFormTitleInput =
  newPostForm.querySelector(".modal__input_type_title") ||
  newPostForm.querySelector("#post-title-input") ||
  newPostForm.querySelector('input[name="name"]');

const newFormImageInput =
  newPostForm.querySelector(".modal__input_type_link") ||
  newPostForm.querySelector(".modal__input_type_image") ||
  newPostForm.querySelector("#post-link-input") ||
  newPostForm.querySelector('input[name="link"]');

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const titleEl = cardElement.querySelector(".card__text");
  const imgEl = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__btn-like");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");

  imgEl.src = data.link;
  imgEl.alt = data.name;
  titleEl.textContent = data.name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__btn-like_active");
  });

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  imgEl.addEventListener("click", () => {
    previewImg.src = data.link;
    previewImg.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardElement;
}

editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileAbout.textContent.trim();
  editSubmit.disabled = !editForm.checkValidity();
  openModal(editProfileModal);
});
editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);

newPostBtn.addEventListener("click", () => {
  newPostSubmit.disabled = !newPostForm.checkValidity();
  openModal(newPostModal);
});
newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));
imagePreviewCloseBtn.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(editProfileModal);
  editForm.reset();
  editSubmit.disabled = true;
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = { name: newFormTitleInput.value, link: newFormImageInput.value };
  const card = getCardElement(data);
  cardsList.prepend(card);
  closeModal(newPostModal);
  newPostForm.reset();
  newPostSubmit.disabled = true;
});

editForm.addEventListener("input", () => {
  editSubmit.disabled = !editForm.checkValidity();
});
newPostForm.addEventListener("input", () => {
  newPostSubmit.disabled = !newPostForm.checkValidity();
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
