
interface Team {
    strTeam: string
    strTeamBadge: string
    strWebsite: string
}

let gLeagues: [][] = [];

async function onInit() {
  await setTeams();
  renderTeams();
}

async function getTeams(league: string = 'English Premier League'): Promise<[]>  {
  try {
    const { teams } = await fetch(
      `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${league}`
    ).then((res) => res.json());
    return teams;
    
  } catch (err) {
    throw(err)
  }
}

async function setTeams() {
  let germanLeague = await getTeams("German Bundesliga");
  let frenchLeague = await getTeams("French Ligue 1");
  let italianLeague = await getTeams("Italian Serie A");
  let englishLeague = await getTeams("English Premier League");
  let spanishLeague = await getTeams("Spanish La Liga");
  gLeagues.push(
    englishLeague,
    germanLeague,
    italianLeague,
    spanishLeague,
    frenchLeague
  );
}

window.addEventListener("load", function () {
  let myTabs = document.querySelectorAll("ul.nav-tabs > li");

  function myTabClicks(tabClickEvent: any) {
    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }

    let clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add("active");

    tabClickEvent.preventDefault();

    let myContentPanes = document.querySelectorAll(".tab-pane");

    for (let i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }

    let anchorReference = tabClickEvent.target;
    let activePaneId = anchorReference.getAttribute("href");
    let activePane = document.querySelector(activePaneId);

    activePane.classList.add("active");
  }

  for (let i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks);
  }
});

function renderTeams() {
  for (let i = 0; i < 5; i++) {
    let tab = document.querySelector(`#tab-${i}`);
    let strHTMl = "";
    gLeagues[i].forEach((team: Team, idx: number) => {
      strHTMl += `
        <div class="team-card">
        <h1>${team.strTeam} </h1>
        <a href="http://${team.strWebsite}" title="Link to Website" target="_blank">
        <img src=${team.strTeamBadge} />
        </a>
        </div>
        `;
    });
    tab!.innerHTML = strHTMl;
  }
}
