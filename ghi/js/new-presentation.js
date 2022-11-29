window.addEventListener("DOMContentLoaded", async () => { //window = browser, addeventlistener waits for an event to happen, (domcontentloaded) document object model
    const url = "http://localhost:8000/api/conferences/"; //renders the URL

    const response = await fetch(url); //promising to fetch URL

    if (response.ok) { //if promise is met
      const data = await response.json(); // return json

      const selectTag = document.getElementById("conference");
      for (let conference of data.conferences) {
        // Create an 'option' element
        const option = document.createElement("option");

        // Set the '.value' property of the option element to the
        // state's abbreviation
        option.value = conference.href;

        // Set the '.innerHTML' property of the option element to
        // the state's name
        option.innerHTML = conference.name;

        // Append the option element as a child of the select tag
        selectTag.appendChild(option);
      }
    }

    const formTag = document.getElementById("create-presentation-form");
    formTag.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));
      const conferenceSelect = document.getElementById("conference");
      const presentationUrl = `http://localhost:8000/api/conferences/${conferenceSelect.value}/presentations/`;
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(presentationUrl, fetchConfig);
      if (response.ok) {
        formTag.reset();
        const newPresentation = await response.json();
        console.log(newPresentation)
      }
    });
  });
