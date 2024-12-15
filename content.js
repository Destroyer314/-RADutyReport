// Updated UNC Charlotte RA Duty Report Form Automation Script

function autoFillForm() {
  const date = document.getElementById("gensec_form_date_from");
  const dateValue = new Date();
  date.value = dateValue.toISOString().split("T")[0];
  // General Info Filling

  function fillGeneralInfo() {
    chrome.storage.sync.get(["hall", "optgroupLabel"], (data) => {  
      if (data.hall) {

        const hallID = parseInt(data.hall);
        const optGroup = data.optgroupLabel;

         locationOptGroup = document.querySelector(
          `input[value="${optGroup}"]`
        );
        console.log (locationOptGroup);
        locationOptGroup.click();
        document.querySelector(`input[value="${hallID}"]`).click();


        }else{
          alert("Please set the hall and optgroup label in the options page.");
          const hallID = 35945;
          const optGroup = 35941;
          locationOptGroup = document.querySelector(
            `input[value="${optGroup}"]`
          );
          console.log (locationOptGroup);
          locationOptGroup.click();
          document.querySelector(`input[value="${hallID}"]`).click();
        }

  });
}

  // Duty Shift Checklist
  function fillDutyShiftChecklist() {
    function selectYes(labelText) {
      const label = Array.from(document.querySelectorAll("label")).find(
        (el) => el.textContent.trim() === labelText
      );
      if (label) {
        const select = document.getElementById(label.getAttribute("for"));
        if (select) {
          const yesOption = Array.from(select.options).find(
            (opt) => opt.text.toLowerCase() === "yes"
          );
          if (yesOption) select.value = yesOption.value;
        }
      }
    }

    selectYes("Turned on duty phone:");
    selectYes("Called into Village Loan Key Desk:");
    selectYes("Changed RA on Duty Sign:");

    const selectElement3 = document.querySelector('[id$="412_data"]');
    selectElement3.value = "671";
    const selectElement4 = document.querySelector('[id$="413_data"]');
    selectElement4.value = "672";
    const selectElement5 = document.querySelector('[id$="414_data"]');
    selectElement5.value = "673";

    document.querySelector('input[id$="-1"]').click();
    const radio = document.querySelector('[id$="416_data"]');
    const ck = radio.querySelector('[id$="-0"]');
    ck.click();
  }

  // Express Check-Out Box
  // Updated section for Express Check-Out Box
  function fillExpressCheckOutBox() {
    // Select the "Did you check the express check out box?" radio button (Yes option)
    const checkOutBoxLabels = Array.from(
      document.querySelectorAll("label")
    ).filter(
      (label) =>
        label.textContent.trim() === "Did you check the express check out box?"
    );

    if (checkOutBoxLabels.length > 0) {
      const yesRadio = document.getElementById(
        checkOutBoxLabels[0].getAttribute("for").replace("-0", "-1")
      );
      if (yesRadio) yesRadio.checked = true; // Select "Yes"
    }

    // Select the "Any keys in the express check-out box?" radio button (No option)
    const checkOutKeysLabels = Array.from(
      document.querySelectorAll("label")
    ).filter(
      (label) =>
        label.textContent.trim() === "Any keys in the express check out box?"
    );

    if (checkOutKeysLabels.length > 0) {
      const noRadio = document.getElementById(
        checkOutKeysLabels[0].getAttribute("for").replace("-1", "-0")
      );
      if (noRadio) noRadio.checked = true; // Select "No"
    }
  }

  // Lockouts
  function fillLockouts() {
    const radio = document.querySelector('[id$="4052_data"]');
    const ck = radio.querySelector('[id$="-0"]');
    ck.click();
    const date = document.getElementById("gensec_form_date_from");
    const dateValue = new Date();
    date.value = dateValue.toISOString().split("T")[0];
  }

  // Rounds/Incidents
  function fillRoundsAndIncidents() {
    const roundTimes = ["20:30", "21:30", "22:30"];
    const roundDescriptions = [
      "Conducted initial evening rounds. Inspected floor common areas and verified all entry/exit points are secure. No immediate issues or safety concerns observed.",
      "Completed mid-evening rounds. Checked floor and common areas for cleanliness and safety. Observed no irregularities or maintenance needs.",
      "Final evening rounds completed. Performed final security check of floor and building. Ensured all common areas are secure, clean, and in proper order.",
    ];
    

    const roundSection = Array.from(
      document.querySelectorAll('[id^="answers[subsections]"]')
    ).filter((el) =>
      el
        .querySelector(".subsection-label")
        .textContent.trim()
        .startsWith("Round/Incident")
    );

    if (roundSection.length > 0) {
      const addButton = roundSection[0].querySelector(
        '.btn-subdued[aria-label="Add subsection"]'
      );
      if (addButton) {
        // Click the "Add" button to create multiple round entries
        for (let i = 1; i < roundTimes.length; i++) {
          addButton.click();
        }

        // Poll until both sections have been added to the DOM
        const pollInterval = setInterval(() => {
          const roundSections = Array.from(
            document.querySelectorAll('[id^="answers[subsections]"]')
          ).filter((el) =>
            el
              .querySelector(".subsection-label")
              .textContent.trim()
              .startsWith("Round/Incident")
          );

          if (roundSections.length >= 2) {
            clearInterval(pollInterval);

            // Now that both sections have been added, populate the fields
            roundTimes.forEach((time, index) => {
             const section = roundSections[index];
              if (section) {
                const dateInput = section.querySelector('input[type="date"]');
                if (dateInput)
                  dateInput.value = new Date().toISOString().split("T")[0];

                const timeInput = section.querySelector('input[type="time"]');
                if (timeInput) timeInput.value = time;

                const programsTextarea = section.querySelector(
                  'textarea[name$="[419][data]"]'
                );
                if (programsTextarea)
                  programsTextarea.value = roundDescriptions[index];

                const incidentsTextarea = section.querySelector(
                  'textarea[name$="[420][data]"]'
                );
                if (incidentsTextarea)
                  incidentsTextarea.value = "No incidents reported.";

                const maxientSelect = section.querySelector(
                  'select[name$="[469][data]"]'
                );
                if (maxientSelect) {
                  const noIncidentsOption = Array.from(
                    maxientSelect.options
                  ).find((opt) => opt.text.toLowerCase() === "no incidents");
                  if (noIncidentsOption)
                    maxientSelect.value = noIncidentsOption.value;
                }

                const maintenanceTextarea = section.querySelector(
                  'textarea[name$="[422][data]"]'
                );
                if (maintenanceTextarea) maintenanceTextarea.value = "None";
                const workOrdersSelect = section.querySelector(
                  'select[name$="[470][data]"]'
                );
                if (workOrdersSelect) {
                  const noWorkOrdersOption = Array.from(
                    workOrdersSelect.options
                  ).find(
                    (opt) =>
                      opt.text.toLowerCase() ===
                      "no maintenance or safety issues."
                  );
                  if (noWorkOrdersOption)
                    workOrdersSelect.value = noWorkOrdersOption.value;
                }
              }
            });
          }
        }, 500); // Poll every 100ms
      }
    }
  }
  // Security Guard Info
  function fillSecurityGuardInfo() {
    const noSecurityGuardRadio = document.querySelector(
      'input[id^="answers[questions][new2046603280][471][data]-0"]'
    );
    if (noSecurityGuardRadio) noSecurityGuardRadio.checked = true;
  }

  function fillGeneralDate() {
    const gen = Array.from(document.querySelectorAll(".content-panel")).filter(
      (el) =>
        el
          .querySelector(".subsection-label")
          .textContent.trim()
          .startsWith("General information")
    );
    for (let i = 0; i < gen.length; i++) {
      gen[i].querySelector('input[type="date"]').value = new Date()
        .toISOString()
        .split("T")[0];
    }
    const dateInput = gen[0].querySelector('input[type="date"]');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split("T")[0];
    }
  }

  // Main fill function
  function fillEntireForm() {
    fillGeneralDate();
    fillGeneralInfo();
    fillDutyShiftChecklist();
    fillExpressCheckOutBox();
    fillLockouts();
    fillRoundsAndIncidents();
    fillSecurityGuardInfo();
    fillGeneralDate();
  }

  fillEntireForm();
  setTimeout(() => {
    const gen = Array.from(document.querySelectorAll(".content-panel"));
    for (let i = 0; i < gen.length; i++) {
      gen[i].querySelector('input[type="date"]').value = new Date()
        .toISOString()
        .split("T")[0];
    }
  }, 3000);
  window.scrollTo(0, 0);
  alert(
    "Duty report form has been successfully filled out. Please review before submission."
  );

  const gen = Array.from(document.querySelectorAll(".content-panel")).filter(
    (el) =>
      el
        .querySelector(".subsection-label")
        .textContent.trim()
        .startsWith("General information")
  );
  for (let i = 0; i < gen.length; i++) {
    gen[i].querySelector('input[type="date"]').value = new Date()
      .toISOString()
      .split("T")[0];
  }
  const dateInput = gen[0].querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
}

function addAutoFillButton() {
  const buttonBar = document.querySelector(".title");
  if (buttonBar) {
    const autoFillButton = document.createElement("button");
    autoFillButton.textContent = "Auto Fill Form";
    autoFillButton.type = "button";
    autoFillButton.addEventListener("click", autoFillForm);
    buttonBar.appendChild(autoFillButton);
  }
  const date = document.getElementById("gensec_form_date_from");
  const dateValue = new Date();
  date.value = dateValue.toISOString().split("T")[0];
}

addAutoFillButton();
