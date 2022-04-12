let gLeagues: [][] = [];

async function onInit() {
  await setTeams();
  renderTeams();
}

async function getTeams(league: string): Promise<[]> {
  const { teams } = await fetch(
    `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${league}`
  ).then((res) => res.json());
  return teams;
}

async function setTeams() {
  let germanLeague = await getTeams("German%20Bundesliga");
  let frenchLeague = await getTeams("French%20Ligue%201");
  let italianLeague = await getTeams("Italian%20Serie%20A");
  let englishLeague = await getTeams("English%20Premier%20League");
  let spanishLeague = await getTeams("Spanish%20La%20Liga");
  gLeagues.push(
    englishLeague,
    germanLeague,
    italianLeague,
    spanishLeague,
    frenchLeague
  );
}

window.addEventListener("load", function () {
 
  var myTabs = document.querySelectorAll("ul.nav-tabs > li");

  function myTabClicks(tabClickEvent: any) {
    for (var i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }

    var clickedTab = tabClickEvent.currentTarget;

    clickedTab.classList.add("active");

    tabClickEvent.preventDefault();

    var myContentPanes = document.querySelectorAll(".tab-pane");

    for (i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }

    var anchorReference = tabClickEvent.target;
    var activePaneId = anchorReference.getAttribute("href");
    var activePane = document.querySelector(activePaneId);

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
    gLeagues[i ].forEach((team) => {
      strHTMl += `
        <div class="team-card">
        <h1>${team.strTeam} </h1>
        <img src=${team.strTeamBadge} />
        </div>
        `;
    });
    tab!.innerHTML = strHTMl;
  }
}
