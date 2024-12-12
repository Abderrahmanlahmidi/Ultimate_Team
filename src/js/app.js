const overlay = document.getElementById("overlay");
const addPlayer = document.getElementById("add_player");
const addOverlay = document.getElementById("add_overlay");
const cancelAddBtn = document.getElementById("cancer_add_button");
const playersCards = document.getElementById("players_cards");
const zones = document.querySelectorAll(".zone");
const number_jeour = document.getElementById("number_jeour");
let allPlayers = []
const formData = {};
const newData = [];
let requiredFields = [];
let numberFields = [];






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

  requiredFields = [
    { id: "name", message: "Name is required." },
    { id: "position", message: "Position is required." },
    { id: "club", message: "Club is required." },
    { id: "photo", message: "Photo URL is required." },
    { id: "logo", message: "Logo URL is required." },
  ];

  numberFields = [
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


console.log(formData);


const loadPlayersData = async (newData) => {
  try {
    let response = await fetch("/src/data/data.json");
    let players = await response.json();
     allPlayers = players.players;


  
    displayData(allPlayers, newData);
  } catch (error) {
    console.error("Error loading data", error);
  }
};

loadPlayersData(newData);

function deletePlayer(i){
  console.log(i);
  allPlayers.splice(i,1);
  displayData(allPlayers);
}




function getPlayer(i){
 
  const modal_button = document.getElementById("modal_button");
  modal_button.value = "edit"
  modal_button.setAttribute("onclick", `editPlayer(${i})`)
  console.log(allPlayers[i]);

  document.getElementById("name").value = allPlayers[i].name;
  document.getElementById("position").value = allPlayers[i].position;
  document.getElementById("club").value = allPlayers[i].club;
  document.getElementById("photo").value = allPlayers[i].photo;
  document.getElementById("logo").value = allPlayers[i].logo;
  document.getElementById("rating").value = allPlayers[i].rating;
  document.getElementById("pace").value = allPlayers[i].pace;
  document.getElementById("shooting").value = allPlayers[i].shooting;
  document.getElementById("passing").value = allPlayers[i].passing;
  document.getElementById("dribbling").value = allPlayers[i].dribbling;
  document.getElementById("defending").value = allPlayers[i].defending;
  document.getElementById("physical").value = allPlayers[i].physical;
  addOverlay.classList.add("flex");
  addOverlay.classList.remove("hidden");

}

function editPlayer(i){

  allPlayers[i].name = document.getElementById("name").value;
  allPlayers[i].position = document.getElementById("position").value;
  allPlayers[i].club = document.getElementById("club").value;
  allPlayers[i].photo = document.getElementById("photo").value;
  allPlayers[i].logo = document.getElementById("logo").value;
  allPlayers[i].rating = document.getElementById("rating").value;
  allPlayers[i].pace = document.getElementById("pace").value;
  allPlayers[i].shooting = document.getElementById("shooting").value;
  allPlayers[i].passing = document.getElementById("passing").value;
  allPlayers[i].dribbling = document.getElementById("dribbling").value;
  allPlayers[i].defending = document.getElementById("defending").value;
  allPlayers[i].physical = document.getElementById("physical").value;
  
  displayData(allPlayers, newData);

  
}





const displayData = (allPlayers, newData) => {

  if (newData?.length) {
    allPlayers = allPlayers.concat(newData);
    number_jeour.innerHTML = allPlayers.length;
  }
 
 
  const displayDataCard = allPlayers
    .map((player, index) => `
    <div
       draggable="true"
       data-position="${player.position}"
       class="player relative w-[150px] h-[200px] bg-cover bg-center bg-no-repeat p-[1.2rem_0] z-2 transition ease-in duration-200"
       style="background-image: url('/src/assets/img/placeholder-card.webp')"
    >
  <div class="relative flex text-[#e9cc74] px-1">
    <div class="absolute flex flex-col text-center uppercase leading-5 font-light pt-2">
      <div class="text-sm">${player.rating}</div>
      <div class="text-xs">${player.position}</div>
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
  <div class="absolute   left-1/2 transform -translate-x-1/2 flex space-x-2">
    <button
      class="delete-btn px-2 py-1 bg-orange text-white text-xs rounded hover:bg-red-600"
      onclick="deletePlayer(${index})"
    >
      Delet
    </button>
    <button
      class="delete-btn px-2 py-1 bg-orange text-white text-xs rounded hover:bg-red-600"
      onclick="getPlayer(${index})"
    >
      Edit
    </button>
  </div>
</div>
`).join("");

  

  playersCards.innerHTML = displayDataCard;

  const playerElements = document.querySelectorAll(".player");
  const delete_btn = document.querySelectorAll(".delete-btn")
  selectPlayer(playerElements, delete_btn);
};




const selectPlayer = (players) => {

  players.forEach(player => {
   player.addEventListener("dragstart", function(event){
     const position = player.getAttribute("data-position")
     event.dataTransfer.setData("text/plain", position);
   })
  })

  zones.forEach(zone => {
   zone.addEventListener("dragover", function(event){
     event.preventDefault();
   })

   zone.addEventListener("drop", function(event){
     const position = event.dataTransfer.getData("text/plain");
     const zonePosition = zone.getAttribute("data-zone");
     if (zonePosition === position) {
       const player = document.querySelector(`[data-position = "${position}"]`)
       zone.appendChild(player);
     }else{
       alert("This player doesn't belong here!");
     }
   })

  })
}