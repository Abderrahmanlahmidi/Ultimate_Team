// DOM Element Selectors
const overlay = document.getElementById("overlay");
const choosePlayerButton = document.getElementById("chose_player");
const cancelOverlayButton = document.getElementById("cancer_button");

const addPlayerButton = document.getElementById("add_player");
const addOverlay = document.getElementById("add_overlay");
const cancelAddButton = document.getElementById("cancer_add_button");

const playersCardsContainer = document.getElementById("players_cards");
const playersAreas = document.querySelectorAll(".player_area");
const addForm = document.getElementById("add_form");

let formData = {};

// Helper Functions
const toggleOverlay = (overlayElement, show) => {
  if (show) {
    overlayElement.classList.add("flex");
    overlayElement.classList.remove("hidden");
  } else {
    overlayElement.classList.add("hidden");
    overlayElement.classList.remove("flex");
  }
};

// Event Listeners
choosePlayerButton.addEventListener("click", () => toggleOverlay(overlay, true));
cancelOverlayButton.addEventListener("click", () => toggleOverlay(overlay, false));

addPlayerButton.addEventListener("click", () => toggleOverlay(addOverlay, true));
cancelAddButton.addEventListener("click", () => toggleOverlay(addOverlay, false));

// Form Handling
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = addForm.querySelectorAll("input");
  let isFormValid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();
    if (!value) {
      alert(`${input.placeholder} is required`);
      isFormValid = false;
      return;
    }
    formData[input.name] = value;
  });

  if (isFormValid) {
    alert("Form submitted successfully!");
    loadPlayersData(formData);
  }
});

// Fetch and Display Players
const loadPlayersData = async (newPlayerData = null) => {
  try {
    const response = await fetch("../data/data.json");
    const { players } = await response.json();

    if (!localStorage.getItem("players")) {
      localStorage.setItem("players", JSON.stringify(players));
    }

    let allPlayers = JSON.parse(localStorage.getItem("players"));

    if (newPlayerData) {
      allPlayers.unshift(newPlayerData);
      localStorage.setItem("players", JSON.stringify(allPlayers));
    }

    displayPlayers(allPlayers);
  } catch (err) {
    console.error("Error loading players data:", err);
  }
};

// Render Players
const displayPlayers = (players) => {
  const playerCardsHTML = players
    .map((player) => `
      <div
        draggable="true"
        class="card relative w-[95px] h-auto bg-cover bg-center bg-no-repeat p-[1.2rem_0] z-2 transition ease-in duration-200"
        style="background-image: url('../assets/img/placeholder-card.webp')"
      >
        <!-- Card Content -->
        <div class="relative flex text-[#e9cc74] px-1">
          <div class="absolute flex flex-col text-center uppercase leading-5 font-light pt-2">
            <div class="text-sm">97</div>
            <div class="text-xs">RW</div>
            <div class="block w-4 h-6">
              <img src="${player.logo}" alt="Club Logo" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="mx-auto w-[40px] h-[40px] overflow-hidden relative">
            <img src="${player.photo}" alt="${player.name}" class="w-full h-full object-contain relative -right-2" />
          </div>
        </div>
        <div class="block text-[#e9cc74] w-full mx-auto py-1 text-center">
          <div class="text-xs uppercase border-b border-[rgba(233,204,116,0.1)] pb-0.5">
            <span class="block text-shadow">${player.name}</span>
          </div>
          <div class="mt-1 flex justify-center space-x-2">
            <!-- Player Attributes -->
            <div class="space-y-0.5 border-r border-[rgba(233,204,116,0.1)] pr-1">
              <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.pace}</span>PAC</span>
              <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.shooting}</span>SHO</span>
              <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.passing}</span>PAS</span>
            </div>
            <div class="space-y-0.5">
              <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.dribbling}</span>DRI</span>
              <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.defending}</span>DEF</span>
              <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.physical}</span>PHY</span>
            </div>
          </div>
        </div>
      </div>
    `)
    .join("");

  playersCardsContainer.innerHTML = playerCardsHTML;

  const playerCards = document.querySelectorAll(".card");
  initializeDragAndDrop(playerCards);
};

// Drag and Drop Handling
const initializeDragAndDrop = (cards) => {
  cards.forEach((card, index) => {
    card.addEventListener("dragstart", (event) => {
      const draggedCard = event.currentTarget;

      playersCardsContainer.addEventListener("dragover", (e) => e.preventDefault());
      playersAreas[index].addEventListener("drop", () => {
        playersAreas[index].appendChild(draggedCard);
      });
    });
  });
};

// Initial Load
loadPlayersData();
