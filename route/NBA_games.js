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
              
        let eastside = []
        let westside = []


        for (i=0;i<EastTeams.length; i++){
            eastside.push({
                name:EastTeams[i].teamSitesOnly.teamName,
                win: EastTeams[i].win,
                loss: EastTeams[i].loss
            });
        }

        for (i=0;i<WestTeams.length; i++){
            westside.push({
                name:WestTeams[i].teamSitesOnly.teamName,
                win: WestTeams[i].win,
                loss: WestTeams[i].loss
            });
        }
    
        res.render('layout', {
            title:"NBA Standing", display:"2019-2020 Season", ConferenceE:"East: ", eastTeam: eastside
            , westTeam: westside, ConferenceW: "West: "
        })
             
    }
    catch(e){
        res.send(400);
    }

});

module.exports = route;

