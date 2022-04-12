let gLeagues: [][] = [];
let germanLeague: [],
  englishLeague: [],
  spanishLeague: [],
  frenchLeague: [],
  italianLeague: [];

async function getData(query: string = "German%20Bundesliga") {
  const { teams } = await fetch(
    `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${query}`
  ).then((res) => res.json());
  return teams;
}

async function onInit() {
  await setTeams();
  renderTeams();
}

async function setTeams() {
  germanLeague = await getData("German%20Bundesliga");
  frenchLeague = await getData("French%20Ligue%201");
  italianLeague = await getData("Italian%20Serie%20A");
  englishLeague = await getData("English%20Premier%20League");
  spanishLeague = await getData("Spanish%20La%20Liga");
  gLeagues.push(
    englishLeague,
    germanLeague,
    italianLeague,
    spanishLeague,
    frenchLeague
  );
}

function createTab(league: [], ev: Event) {
  console.log(league);
}
window.addEventListener("load", function () {
  // store tabs variable
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
  for (let i = 1; i < 6; i++) {
    let tab = document.querySelector(`#tab-${i}`);
    console.log(gLeagues[i - 1]);
    let strHTMl = "";
    gLeagues[i - 1].forEach((team) => {
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
