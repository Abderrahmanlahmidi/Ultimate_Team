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
  const formData = {}; 

  
  inputs.forEach(input => {
      const value = input.value.trim();
      
     
      if (!value) { 
          alert(`${input.placeholder} must be a valid number between 0 and 100`);
          isFormValid = false;
          return;
      }

      
      if (input.type === 'number') {
          const numberValue = parseFloat(value);
          if (isNaN(numberValue) || numberValue < 0 || numberValue > 100) {

              alert(`${input.placeholder} must be a valid number between 0 and 100`);
              isFormValid = false;
              return;
          }
      }

      if (input.type === 'text') {
         
          if (!/^[a-zA-Z\s]*$/.test(value)) {
              alert(`${input.placeholder} must only contain letters`);
              isFormValid = false;
              return;
          }
      }
      
      formData[input.name] = input.value;
  });
 
  if (isFormValid) {
      alert('Form submitted successfully!');
      loadPlayersData(formData);
  }
});






const loadPlayersData = async (formData = null) => {
  try {

    let response = await fetch("../data/data.json");
    let players = await response.json();

    players = players.players;

    console.log(players);

    if (!localStorage.getItem("players")) {
      localStorage.setItem("players", JSON.stringify(players));
    }

    let allPlayers = JSON.parse(localStorage.getItem("players"));

    localStorage.clear()
    
    displayData(allPlayers, formData); 


  } catch (err) {
    console.error("Error loading data", err);
  }
};

loadPlayersData();


const displayData = async (allPlayers, formData) => {
  if (formData != null) {
    allPlayers.unshift(formData);
  }

  const displayDataCard = allPlayers
    .map((elements) => {
      return `
        <div
          draggable="true"
          class="card relative w-[95px] h-auto bg-cover bg-center bg-no-repeat p-[1.2rem_0] z-2 transition ease-in duration-200"
          style="background-image: url('../assets/img/placeholder-card.webp')"
        >
          <!-- Card Top -->
          <div class=" relative flex text-[#e9cc74] px-1">
            <!-- Master Info -->
            <div class="absolute flex flex-col text-center uppercase leading-5 font-light pt-2">
              <div class="text-sm">${elements.rating}</div>
              <div class="text-xs">RW</div>
              <div class="block w-4 h-6">
                <img
                  src="${elements.logo}"
                  alt="Logo"
                  class="w-full h-full object-contain"
                />
              </div>
            </div>
            <div class="mx-auto w-[40px] h-[40px] overflow-hidden relative">
              <img
                src="${elements.photo}"
                alt="Player"
                class="w-full h-full object-contain relative -right-2"
              />
            </div>
          </div>
          <!-- Card Bottom -->
          <div class="relative">
            <div class="block text-[#e9cc74] w-full mx-auto py-1 text-center">
              <div class="text-xs uppercase border-b border-[rgba(233,204,116,0.1)] pb-0.5 overflow-hidden">
                <span class="block text-shadow">${elements.name}</span>
              </div>
              <div class="mt-1 flex justify-center space-x-2">
                <div class="space-y-0.5 border-r border-[rgba(233,204,116,0.1)] pr-1">
                  <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.pace}</span> PAC
                  </span>
                  <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.shooting}</span> SHO
                  </span>
                  <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.passing}</span> PAS
                  </span>
                </div>
                <div class="space-y-0.5">
                  <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.dribbling}</span> DRI
                  </span>
                  <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.defending}</span> DEF
                  </span>
                  <span class="flex text-[10px] uppercase">
                    <span class="font-bold mr-0.5">${elements.physical}</span> PHY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join(" ");

  players_cards.innerHTML = displayDataCard;
  const cards = document.querySelectorAll(".card");
  console.log(cards);
  drag_drop(cards);
};


const players_area = document.querySelectorAll(".player_area"); 
const players_cards = document.getElementById("players_cards");

const drag_drop = (cards) => {
  
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("dragstart", (e) => {
      let selected = e.target;

      
      players_cards.addEventListener("dragover", function(e) {
        e.preventDefault();
        if (overlay) {
          overlay.classList.add("hidden");
        }
      });

      players_area[i].addEventListener("drop", function (e) {
        e.preventDefault();
        players_area[i].appendChild(selected);
        selected = null;
      });
    });
  }
};


drag_drop(players_cards.children); 





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


