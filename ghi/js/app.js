// const mainTag = document.querySelector('.col');
function createCard(name, description, pictureUrl, starts, ends, locations) {
    return `
    <div class="card shadow p-0 mb-4 bg-body rounded" ">

        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${locations}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">${starts} - ${ends}</div>
      </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        document.querySelector(".row").innerHTML += `
        <div class="alert alert-danger" role="alert">
          There was a problem gathering conference information.
        </div>
      `
        // throw new Error('Response not ok')
      } else {
        const data = await response.json(); //wait process to finish
        // console.log(data);
        // const conference = data.conferences[0];
        // const nameTag = document.querySelector('.card-title');
        // nameTag.innerHTML = conference.name;
        // console.log(conference);
        let i = 0;
        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureURL = details.conference.location.picture_url;
                const starts = new Date(details.conference.starts);
                const ends = new Date(details.conference.ends)
                const locations = details.conference.location.name;
                const html = createCard(title, description, pictureURL, starts.toLocaleDateString("en-US"), ends.toLocaleDateString("en-US"), locations);
                if (i == 3) { //once columns hit 3, restart at 1st column
                    i = 0;
                }
                const column = document.querySelectorAll('.col-sm')[i];
                column.innerHTML += html;
                i+=1;
            }
        }
      }
    } catch (e) {
      // Figure out what to do if an error is raised
        console.error(e);

    }

  });
