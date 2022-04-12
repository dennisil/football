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
let gLeagues = [];
function onInit() {
    return __awaiter(this, void 0, void 0, function* () {
        yield setTeams();
        renderTeams();
    });
}
function getTeams(league = 'English Premier League') {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { teams } = yield fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${league}`).then((res) => res.json());
            return teams;
        }
        catch (err) {
            throw (err);
        }
    });
}
function setTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        let germanLeague = yield getTeams("German Bundesliga");
        let frenchLeague = yield getTeams("French Ligue 1");
        let italianLeague = yield getTeams("Italian Serie A");
        let englishLeague = yield getTeams("English Premier League");
        let spanishLeague = yield getTeams("Spanish La Liga");
        gLeagues.push(englishLeague, germanLeague, italianLeague, spanishLeague, frenchLeague);
    });
}
window.addEventListener("load", function () {
    let myTabs = document.querySelectorAll("ul.nav-tabs > li");
    function myTabClicks(tabClickEvent) {
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
        gLeagues[i].forEach((team, idx) => {
            strHTMl += `
        <div class="team-card">
        <h1>${team.strTeam} </h1>
        <a href="http://${team.strWebsite}" title="Link to Website" target="_blank">
        <img src=${team.strTeamBadge} />
        </a>
        </div>
        `;
        });
        tab.innerHTML = strHTMl;
    }
}
