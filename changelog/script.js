//Static list
var list;

//References for the feature-statuses
const status = {
    0:{
        "name":"Removed",
        "css":"removed"
    },
    1:{
        "name":"Added",
        "css":"add"
    },
    2:{
        "name":"Reworked",
        "css":"reworked"
    }
}

//Adds the load event
window.onload=()=>{
    //Gets the list
    list=document.getElementsByClassName("middle")[0]

    //Loads the changelogs
    loadChangelog();
}

/**
 * Loads the changelog
 */
async function loadChangelog(){
    //Gets the version
    let resp = await fetch("../api/version");
    let txt = await resp.text();

    //Loads every changelog
    for(let i=parseFloat(txt);i>=0.1;i-=.1){
        try{
            //Tries to load the changelog
            loadVersion(i);
        }catch(e){}
    }
}

/**
 * Loads the changelog from the given version
 * @param {Float} version the version to load
 */
async function loadVersion(version){
    //Loads the changelog as json
    let resp = await fetch(`../api/changelogs/${version}.json`);
    let json = await resp.json();

    //Release data
    let date = document.createElement("p")
    date.textContent=`Release from ${json["release"]}`;

    //Head
    let head = document.createElement("h3");
    head.textContent=`Version ${version}`;

    //Table
    let table = document.createElement("table");
    //Table-head
    table.innerHTML="<thead><tr><th>Feature</th><th>Description</th><th>Status</th></tr></thead>"
    //Table-body
    let body = document.createElement("tbody");

    //Iterates over every feature
    for(let feature of json["changes"]){
        //Row
        let row = document.createElement("tr");

        //Feature
        let colFeature = document.createElement("td");
        colFeature.textContent=feature["feature"];
        row.appendChild(colFeature);

        //Description
        let colDesc = document.createElement("td");
        colDesc.textContent=feature["desc"];
        row.appendChild(colDesc);

        //Type
        let colType = document.createElement("td");
        colType.textContent=status[feature["type"]]["name"];
        colType.classList.toggle(status[feature["type"]]["css"]);
        row.appendChild(colType);

        body.appendChild(row);
    }
    table.appendChild(body);

    //Appends the changelog
    list.appendChild(head);
    list.appendChild(date);
    list.appendChild(table);

    
}