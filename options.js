// DOM Elements
const hallInput = document.getElementById("hall");
const saveButton = document.getElementById("save");

// Load saved settings
chrome.storage.sync.get("hall", (data) => {
  if (data.hall) {
    hallInput.value = data.hall;
  }
});
const hallToNumber = {
  "Cedar Hall": 67494,
  "Greek Village House 1": 35960,
  "Hawthorn Hall": 35938,
  "Hickory Hall": 67495,
  "Martin Hall": 35945,
  "Witherspoon Hall": 35953,
  "Holshouser Hall": 35939,
  "Hunt Hall": 35943,
  "Laurel Hall": 35956,
  "Scott Hall": 35951,
  "Belk Hall": 35936,
  "CF Lynch Hall": 35944,
  "Miltimore Hall": 35946,
  "Wallis Hall": 35952,
  "Elm Hall": 35973,
  "Levine Hall": 38351,
  "Maple Hall": 35974,
  "Moore Hall": 35947,
  "Oak Hall": 35975,
  "Pine Hall": 35976,
  "Sanford Hall": 35950,
  "Wilson Hall": 108692,
  "Non-Resident": 67603,
};

const optgroupLabelToNumber = {
  "East Village": 35941,
  "Lower South Village": 35942,
  "North Village": 35940,
  "South East Village": 35954,
};
// Save settings
saveButton.addEventListener("click", () => {

  const hall = hallToNumber[hallInput.value];
  const optgroupLabel = optgroupLabelToNumber[hallInput.options[hallInput.selectedIndex].parentNode.label];

  chrome.storage.sync.set({ hall, optgroupLabel }, () => {
    alert("Settings saved!");
  });
});
