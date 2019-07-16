const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url'); 

//win is the global reference to the window object
//if we dont create this the windw will be closed immediately when js file is garbage collected

let win;

function createWindow(){
  win = new BrowserWindow({
    width:800, //define the width and height of our electron desktop app
    height: 600,
    webPreferences: {//this lets us run node in our html file. without this i cant use 'require' in html
      nodeIntegration: true
    }
  })
//here we load up the html page
  win.loadURL(url.format({
    pathname:path.join(__dirname, 'index.html'),
    protocol: 'file', //could also be http
    slashes:true
  }))


  //putting this will automatically open the dev tools for development
  win.webContents.openDevTools();
  
  //the .on() method takes in a whole bunch of different events.
  //when the window is closed we want to set win back to null
  win.on('closed', ()=> {
    win = null
  })
  //this will quit when all windows are closed
  win.on('window-all-closed', ()=>{
    //NOW in here we gotta check to see if the user is on a mac...
    //we check this because mac has a havit of keeping an app running even after all of its windows are closed. You'd have to manually quit the program.
    if(process.platform !== 'darwin'){//'darwin' represents macOSx and win32 is for windows. SO this is saying literally saying "If user is not on a mac..."
      app.quit();// if user is on a mac quit when all windows are closed
    }
  })
}
console.log("is an electron partyy")

//sooooo now in order to run this electron app we specify that...
//if the app is ready then load the window(aka he function above we just created)
app.on('ready', createWindow)