window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

    // Here, add the 'd-none' class to the loading icon
    document.getElementById("loading-conference-spinner").classList.add("d-none");
    selectTag.classList.remove("d-none");
    // Here, remove the 'd-none' class from the select tag
}

    const formTag = document.getElementById("create-attendee-form");
    formTag.addEventListener("submit", async (event) => {
      event.preventDefault(); //prevent default from happening

      const formData = new FormData(formTag); //make FormData object from the form
      const json = JSON.stringify(Object.fromEntries(formData));
      const conferenceSelect = document.getElementById("conference");
      const attendeesUrl = `http://localhost:8001/api/attendees/`;

      //   const attendeesUrl = `http://localhost:8001/api/conferences/${conferenceSelect.value}/attendees/`;
      const fetchConfig = {
        method: "post",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(attendeesUrl, fetchConfig);
      if (response.ok) {
        formTag.reset();
        const newAttendee = await response.json();
        document.getElementById("success-message").classList.remove("d-none")
        document.getElementById("create-attendee-form").classList.add("d-none")
      }
    });
  });
