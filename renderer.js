//nothing in here just yet 
const {app, BrowserWindow} = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url'); 

//win is the global reference to the window object
//if we dont create this the windw will be closed immediately when js file is garbage collected

let win2;

function createWindow2(){
  win2 = new BrowserWindow({
    width:800, //define the width and height of our electron desktop app
    height: 600,
    webPreferences: {//this lets us run node in our html file. without this i cant use 'require' in html
      nodeIntegration: true
    }
  })
//here we load up the html page
  win2.loadURL('https://graphql.org/');
}

app.on('ready', createWindow2);