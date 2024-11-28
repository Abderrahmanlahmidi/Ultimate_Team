const overlay = document.getElementById("overlay");
const chose_player = document.getElementById("chose_player");
const cancer_button = document.getElementById("cancer_button");


chose_player.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
});

cancer_button.addEventListener("click", function () {
  overlay.classList.remove("flex");
  overlay.classList.add("hidden");
});


const formData = {};
  
document.getElementById('add_form').addEventListener('submit', function (event) {
  event.preventDefault();

  const inputs = this.querySelectorAll('input');

  let isFormValid = true;

  inputs.forEach(input => {
      const value = input.value.trim();

      if (!value) { 
          alert(`${input.placeholder} is required`);
          isFormValid = false;
          return;
      }
        formData[input.name] = input.value;
      


  });

  if (isFormValid) {
      alert('Form submitted successfully!');
  }

  loadPlayersData(formData)


});


const loadPlayersData = async (formData = null) => {
  try {

    let response = await fetch("../data/data.json");
    let players = await response.json();

    players = players.players;

    if (!localStorage.getItem("players")) {
      localStorage.setItem("players", JSON.stringify(players));
    }

    let allPlayers = JSON.parse(localStorage.getItem("players"));

    displayData(allPlayers, formData); 


  } catch (err) {
    console.error("Error loading data", err);
  }
};

loadPlayersData();


const displayData = async (allPlayers, formData) => {

  if (formData != null) {
    allPlayers.push(formData);
  }

   



  const displayDataCard = allPlayers.map((elements) => {
      return `
           <div
            draggable="true"
            class="card relative w-[95px] h-auto bg-cover bg-center bg-no-repeat p-[1.2rem_0] z-2 transition ease-in duration-200"
            style="background-image: url('../assets/img/placeholder-card.webp')"
            >
            <!-- Card Top -->
            <div class="card relative flex text-[#e9cc74] px-1">
            <!-- Master Info -->
            <div class="absolute flex flex-col text-center uppercase leading-5 font-light pt-2">
                <!-- Player Rating -->
                <div class="text-sm">97</div>
                <!-- Player Position -->
                <div class="text-xs">RW</div>
                <!-- Player Nation -->

                <!-- Player Club -->
                <div class="block w-4 h-6">
                <img
                    src="${elements.logo}"
                    alt="Barcelona"
                    class="w-full h-full object-contain"
                />
                </div>
            </div>
            <!-- Player Picture -->
            <div class="mx-auto w-[40px] h-[40px] overflow-hidden relative">
                <img
                src="${elements.photo}"
                alt="Messi"
                class="w-full h-full object-contain relative -right-2"
                />
            </div>
            </div>
            <!-- Card Bottom -->
            <div class="relative">
            <!-- Player Info -->
            <div class="block text-[#e9cc74] w-full mx-auto py-1 text-center">
                <!-- Player Name -->
                <div class="text-xs uppercase border-b border-[rgba(233,204,116,0.1)] pb-0.5 overflow-hidden">
                <span class="block text-shadow">${elements.name}</span>
                </div>
                <!-- Player Features -->
                <div class="mt-1 flex justify-center space-x-2">
                <!-- Column 1 -->
                <div class="space-y-0.5 border-r border-[rgba(233,204,116,0.1)] pr-1">
                    <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.pace}</span>
                    <span class="font-light">PAC</span>
                    </span>
                    <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.shooting}</span>
                    <span class="font-light">SHO</span>
                    </span>
                    <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.passing}</span>
                    <span class="font-light">PAS</span>
                    </span>
                </div>
                <!-- Column 2 -->
                <div class="space-y-0.5">
                    <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.dribbling}</span>
                    <span class="font-light">DRI</span>
                    </span>
                    <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.defending}</span>
                    <span class="font-light">DEF</span>
                    </span>
                    <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.physical}</span>
                    <span class="font-light">PHY</span>
                    </span>
                </div>
                </div>
            </div>
            </div>
            </div>
        `;
    })
    .join(" ");

  players_cards.innerHTML = displayDataCard;
  const cards = document.querySelectorAll(".card");
  drag_drop(cards);
};

const players_area = document.querySelectorAll(".player_area");
const players_cards = document.getElementById("players_cards");

const drag_drop = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("dragstart", (e) => {
      let selected = e.currentTarget;

      players_cards.addEventListener("dragover", function (e) {
        e.preventDefault();

        overlay.classList.add("hidden");
      });

      players_area[i].addEventListener("drop", function (e) {
        players_area[i].appendChild(selected);
        selected = null;
      });
    });
  }
};


const add_player = document.getElementById("add_player");
const add_overlay = document.getElementById("add_overlay");
const cancer_add_button = document.getElementById("cancer_add_button");

add_player.addEventListener("click", function () {
  add_overlay.classList.add("flex");
  add_overlay.classList.remove("hidden");
});

cancer_add_button.addEventListener("click", function () {
  add_overlay.classList.add("hidden");
  add_overlay.classList.remove("flex");
});


