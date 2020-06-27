const express = require("express");
const route= express.Router();

const axios = require("axios")
const path = require('path')
const app = express();

route.get("/", async (req, res) => {
    try{
        const response = await axios.get('http://data.nba.net/10s/prod/v4/today.json');
        const ConfStandings = response.data.links.leagueConfStandings
        const TeamsStandings = await axios.get(`http://data.nba.net/10s/${ConfStandings}`);
        const Conference = TeamsStandings.data.league.standard.conference
        const EastTeams = Conference.east
        const WestTeams = Conference.west
        
        const DivStandings=response.data.links.leagueDivStandings
        const teamDivStandings = await axios.get(`http://data.nba.net/10s/${DivStandings}`)
        const EastDiv = teamDivStandings.data.league.standard.conference.east
        const WestDiv = teamDivStandings.data.league.standard.conference.west

        const Atlantic = EastDiv.atlantic
        const Central = EastDiv.central
        const SouthEast = EastDiv.southeast

        const NorthWest = WestDiv.northwest
        const Pacific = WestDiv.pacific
        const Southwest = WestDiv.southwest
              
        let eastside = []
        let westside = []

        let atlanticside = []
        let centralside = []
        let southeastside = []

        let northwestside = []
        let pacificside= []
        let southwestside= []

        for (i=0; i<Pacific.length; i++){
            atlanticside.push({
                name:Atlantic[i].teamSitesOnly.teamName,
                win: Atlantic[i].win,
                loss: Atlantic[i].loss
            })

            centralside.push({
                name:Central[i].teamSitesOnly.teamName,
                win: Central[i].win,
                loss: Central[i].loss
            })

            southeastside.push({
                name:SouthEast[i].teamSitesOnly.teamName,
                win: SouthEast[i].win,
                loss: SouthEast[i].loss
            })

            northwestside.push({
                name:NorthWest[i].teamSitesOnly.teamName,
                win: NorthWest[i].win,
                loss: NorthWest[i].loss
            })
            pacificside.push({
                name:Pacific[i].teamSitesOnly.teamName,
                win: Pacific[i].win,
                loss: Pacific[i].loss
            })
            southwestside.push({
                name:Southwest[i].teamSitesOnly.teamName,
                win: Southwest[i].win,
                loss: Southwest[i].loss
            })

        }
    
        for (i=0;i<EastTeams.length; i++){
            eastside.push({
                name:EastTeams[i].teamSitesOnly.teamName,
                win: EastTeams[i].win,
                loss: EastTeams[i].loss
            });

            westside.push({
                name:WestTeams[i].teamSitesOnly.teamName,
                win: WestTeams[i].win,
                loss: WestTeams[i].loss
            });

        }

        for (i=0;i<WestTeams.length; i++){
            
        }
    
        res.render('layout', {
            title:"NBA Standing", display:"2019-2020 Season Standings", ConferenceE:"East: ", eastTeam: eastside
            , westTeam: westside, ConferenceW: "West: ", AtlDivision: "Atlantic", atlanticTeam:atlanticside,
            CtlDivision:"Central", centralTeam: centralside, SEDivision:"SouthEast", southeastTeam: southeastside, 
            NWDivision:"NorthWest", northwestTeam: northwestside, PacificDivision: "Pacific", pacificTeam: pacificside, 
            SWDivision:"SouthWest", southwestTeam: southeastside

        })
             
    }
    catch(e){
        res.send(400);
    }

});

module.exports = route;

