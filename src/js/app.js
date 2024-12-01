const overlay = document.getElementById("overlay");
const addPlayer = document.getElementById("add_player");
const addOverlay = document.getElementById("add_overlay");
const cancelAddBtn = document.getElementById("cancer_add_button");
const playersCards = document.getElementById("players_cards");
const zones = document.querySelectorAll(".zone");

const formData = {};
const newData = [];


addPlayer.addEventListener("click", () => {
  addOverlay.classList.remove("hidden");
  addOverlay.classList.add("flex");
});


cancelAddBtn.addEventListener("click", () => {
  addOverlay.classList.add("hidden");
  addOverlay.classList.remove("flex");
});


document.getElementById("add_form").addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  let errorMessage = "";

  const requiredFields = [
    { id: "name", message: "Name is required." },
    { id: "position", message: "Position is required." },
    { id: "nationality", message: "Nationality is required." },
    { id: "club", message: "Club is required." },
    { id: "photo", message: "Photo URL is required." },
    { id: "logo", message: "Logo URL is required." },
  ];

  const numberFields = [
    { id: "rating", message: "Rating must be between 0 and 100 or empty." },
    { id: "pace", message: "Pace must be between 0 and 100 or empty." },
    { id: "shooting", message: "Shooting must be between 0 and 100 or empty." },
    { id: "passing", message: "Passing must be between 0 and 100 or empty." },
    { id: "dribbling", message: "Dribbling must be between 0 and 100 or empty." },
    { id: "defending", message: "Defending must be between 0 and 100 or empty." },
    { id: "physical", message: "Physical must be between 0 and 100 or empty." },
  ];


  requiredFields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input.value.trim()) {
      isValid = false;
      errorMessage += `${field.message}\n`;
      input.classList.add("border-[#991b1b]");
    } else {
      input.classList.remove("border-[#991b1b]");
      formData[field.id] = input.value.trim();
    }
  });


  numberFields.forEach((field) => {
    const input = document.getElementById(field.id);
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0 || value > 100) {
      isValid = false;
      errorMessage += `${field.message}\n`;
      input.classList.add("border-[#991b1b]");
    } else {
      input.classList.remove("border-[#991b1b]");
      formData[field.id] = value;
    }
  });

  if (!isValid) {
    alert(errorMessage);
    return;
  }

  newData.push(formData);
  loadPlayersData(newData);
});


const loadPlayersData = async (newData) => {
  try {
    let response = await fetch("../data/data.json");
    let players = await response.json();
    players = players.players;

    if (!localStorage.getItem("players")) {
      localStorage.setItem("players", JSON.stringify(players));
    }

    let allPlayers = JSON.parse(localStorage.getItem("players"));
    displayData(allPlayers, newData);
  } catch (error) {
    console.error("Error loading data", error);
  }
};

loadPlayersData(newData);



const displayData = (allPlayers, newData) => {
  if (newData.length) {
    allPlayers = allPlayers.concat(newData);
  }

  const displayDataCard = allPlayers
    .map((player) => `
      <div
        draggable="true"
        data-position="${player.id}"
        class="player relative w-[150px] h-[160px] bg-cover bg-center bg-no-repeat p-[1.2rem_0] z-2 transition ease-in duration-200"
        style="background-image: url('../assets/img/placeholder-card.webp')"
      >
        <div class="relative flex text-[#e9cc74] px-1">
          <div class="absolute flex flex-col text-center uppercase leading-5 font-light pt-2">
            <div class="text-sm">${player.rating}</div>
            <div class="text-xs">RW</div>
            <div class="block w-4 h-6">
              <img src="${player.logo}" alt="Logo" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="mx-auto w-[40px] h-[40px] overflow-hidden relative">
            <img src="${player.photo}" alt="Player" class="w-full h-full object-contain relative -right-2" />
          </div>
        </div>
        <div class="relative">
          <div class="block text-[#e9cc74] w-full mx-auto py-1 text-center">
            <div class="text-xs uppercase border-b border-[rgba(233,204,116,0.1)] pb-0.5 overflow-hidden">
              <span class="block text-shadow">${player.name}</span>
            </div>
            <div class="mt-1 flex justify-center space-x-2">
              <div class="space-y-0.5 border-r border-[rgba(233,204,116,0.1)] pr-1">
                <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.pace}</span> PAC</span>
                <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.shooting}</span> SHO</span>
                <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.passing}</span> PAS</span>
              </div>
              <div class="space-y-0.5">
                <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.dribbling}</span> DRI</span>
                <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.defending}</span> DEF</span>
                <span class="flex text-[10px] uppercase"><span class="font-bold mr-0.5">${player.physical}</span> PHY</span>
              </div>
            </div>
          </div>
        </div>
      </div>`)
    .join("");

  playersCards.innerHTML = displayDataCard;

  const playerElements = document.querySelectorAll(".player");
  selectPlayer(playerElements);
};




const selectPlayer = (players) => {

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    zone.addEventListener("drop", (e) => {
      const position = e.dataTransfer.getData("text/plain");
      const zonePosition = zone.getAttribute("data-zone");

     
      if (zonePosition === position) {
        const player = document.querySelector(`[data-position="${position}"]`);
        zone.appendChild(player);
      } else {
        alert("This player doesn't belong here!");
      }
    });
  });


  players.forEach((player) => {
    player.addEventListener("dragstart", (e) => {
      const position = player.getAttribute("data-position");
      e.dataTransfer.setData("text/plain", position);
    });
  });
};



