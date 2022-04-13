interface Team {
  strTeam: string;
  strTeamBadge: string;
  strWebsite: string;
}

// const array of league names
const gLeagueNames: readonly string[] = [
  "English Premier League",
  "German Bundesliga",
  "Italian Serie A",
  "Spanish La Liga",
  "French Ligue 1",
] as const;

let gLeagues: Team[][] = [];

// init function called on page load
async function onInit() {
  await setTeams();
  renderTeams();
}

// fetch teams from API
async function getTeams(
  league: string = "English Premier League"
): Promise<[]> | never {
  try {
    const { teams } = await fetch(
      `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${league}`
    ).then((res) => res.json());
    return teams;
  } catch (err) {
    throw err;
  }
}

// Append all leagues to global array
async function setTeams(): Promise<void> {
  for (const name of gLeagueNames) {
    let league = await getTeams(name);
    gLeagues.push(league);
  }
}

window.addEventListener("load", function () {
  let myTabs = document.querySelectorAll("ul.nav-tabs > li");
  // Clicking tabs
  function myTabClicks(tabClickEvent: any) {
    for (let i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }

    let clickedTab: HTMLElement = tabClickEvent.currentTarget;

    clickedTab.classList.add("active");

    tabClickEvent.preventDefault();

    let myContentPanes = document.querySelectorAll(".tab-pane");
    // remove active calss from non clicked tabs
    for (let i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }

    let anchorReference = tabClickEvent.target;
    let activePaneId = anchorReference.getAttribute("href");
    let activePane = document.querySelector(activePaneId);
    // add active class to clicked tab
    activePane.classList.add("active");
  }

  for (let i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks);
  }
});

// loop through and render teams logo etc...
function renderTeams() {
  for (let i = 0; i < 5; i++) {
    let tab: HTMLElement | null = document.querySelector(`#tab-${i}`);
    let strHTMl = "";
    gLeagues[i].forEach((team: Team) => {
      strHTMl += `
        <div class="team-card">
        <h1>${team.strTeam} </h1>
        <a href="http://${team.strWebsite}" title="Go to ${team.strTeam}'s Website" target="_blank">
        <img src=${team.strTeamBadge} />
        </a>
        </div>
        `;
    });
    tab!.innerHTML = strHTMl;
  }
}
