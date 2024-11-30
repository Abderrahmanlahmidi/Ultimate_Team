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
const newData = [];

document.getElementById('add_form').addEventListener('submit', function(event) {
  event.preventDefault();

  let valid = true;
  let errorMessage = '';


  const fields = [
      { id: 'name', errorMessage: 'Name is required.' },
      { id: 'position', errorMessage: 'Position is required.' },
      { id: 'nationality', errorMessage: 'Nationality is required.' },
      { id: 'club', errorMessage: 'Club is required.' },
      { id: 'photo', errorMessage: 'Photo URL is required.' },
      { id: 'logo', errorMessage: 'Logo URL is required.' }
  ];

  const numberFields = [
      { id: 'rating', errorMessage: 'Rating must be between 0 and 100 Or empty.' },
      { id: 'pace', errorMessage: 'Pace must be between 0 and 100 Or empty.' },
      { id: 'shooting', errorMessage: 'Shooting must be between 0 and 100 Or empty.' },
      { id: 'passing', errorMessage: 'Passing must be between 0 and 100 Or empty.' },
      { id: 'dribbling', errorMessage: 'Dribbling must be between 0 and 100 Or empty.' },
      { id: 'defending', errorMessage: 'Defending must be between 0 and 100 Or empty.' },
      { id: 'physical', errorMessage: 'Physical must be between 0 and 100 Or empty.' }
  ];


  fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (!input.value.trim()) { 
          valid = false;
          errorMessage += `${field.errorMessage}\n`; 
          input.classList.add('border-[#991b1b]');
      } else {
          input.classList.remove('border-[#991b1b]');
          formData[field.id] = input.value.trim();
      }
  });

  
  numberFields.forEach(field => {
      const input = document.getElementById(field.id);
      const value = parseFloat(input.value);
      if (isNaN(value) || value < 0 || value > 100) {
          valid = false;
          errorMessage += `${field.errorMessage}\n`;
          input.classList.add('border-[#991b1b]');
      } else {
          input.classList.remove('border-[#991b1b]');
          formData[field.id] = value;
      }
  });

  if (!valid) {
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


  } catch (err) {
    console.error("Error loading data", err); 
  }
};

loadPlayersData(newData);



const displayData = async (allPlayers, newData) => {
 
    
  if (newData.length != null) {
    for (let i = 0; i < newData.length; i++) {
      allPlayers.push(newData[i]);
    }
  }


  const displayDataCard = allPlayers
  .map((elements) => {

      return `
        <div
          draggable="true"
          class="card relative w-[150px] h-auto bg-cover bg-center bg-no-repeat p-[1.2rem_0] z-2 transition ease-in duration-200"
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
  drag_drop(cards);
};



// const players_area = document.querySelectorAll(".player_area"); 
const players_cards = document.getElementById("players_cards");
const area = document.getElementById("area");

const drag_drop = (cards) => {

  console.log(cards[0])
  console.log(players_cards)
  console.log(area)
  console.log("-----after--------");

  cards[0].addEventListener("dragstart", function(event){
    let selected = event.target;
    console.log(selected);
    
    
    players_cards.addEventListener("dragover", function(event){
      event.preventDefault();
      overlay.classList.add("hidden");
      
    });
    
    area.addEventListener("drop", function(event){
      area.appendChild(selected);
      selected = null;
    })
  })
  
};


drag_drop(cards)






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


