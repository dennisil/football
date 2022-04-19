"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const array of league names
const gLeagueNames = [
    "English Premier League",
    "German Bundesliga",
    "Italian Serie A",
    "Spanish La Liga",
    "French Ligue 1",
];
let gLeagues = [];
// init function called on page load
function onInit() {
    return __awaiter(this, void 0, void 0, function* () {
        addEventListenerForTabs();
        yield setTeams();
        renderTeams();
    });
}
// fetch teams from API
function getTeams(league = "English Premier League") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { teams } = yield fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${league}`).then((res) => res.json());
            return teams;
        }
        catch (err) {
            throw err;
        }
    });
}
// Append all leagues to global array
function setTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        // for (const name of gLeagueNames) {
        //   let league = await getTeams(name);
        //   gLeagues.push(league);
        // }
        try {
            yield Promise.all([
                getTeams(gLeagueNames[0]),
                getTeams(gLeagueNames[1]),
                getTeams(gLeagueNames[2]),
                getTeams(gLeagueNames[3]),
                getTeams(gLeagueNames[4]),
            ]).then((leagues) => (gLeagues = leagues));
        }
        catch (err) {
            console.log(err);
        }
    });
}
function addEventListenerForTabs() {
    let myTabs = document.querySelectorAll("ul.nav-tabs > li");
    // Clicking tabs
    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("active");
        }
        let clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("active");
        tabClickEvent.preventDefault();
        let myContentPanes = document.querySelectorAll(".tab-pane");
        // remove active class from non clicked tabs
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
}
// loop through and render teams logo etc...
function renderTeams() {
    for (let i = 0; i < 5; i++) {
        let tab = document.querySelector(`#tab-${i}`);
        let strHTMl = "";
        gLeagues[i].forEach((team) => {
            strHTMl += `
        <div class="team-card">
        <h1>${team.strTeam} </h1>
        <a href="http://${team.strWebsite}" title="Go to ${team.strTeam}'s Website" target="_blank">
        <img src=${team.strTeamBadge} />
        </a>
        </div>
        `;
        });
        tab.innerHTML = strHTMl;
    }
}
