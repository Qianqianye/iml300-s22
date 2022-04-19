let drawing = [];
let isDrawing = false;

// Replace with your own web app's Firebase configuration. 
const firebaseConfig = {
  apiKey: "AIzaSyBMsRfJ7ylKi_FUW9lZc9iC0q4mx55ooO0",
  authDomain: "p5-collective-canvas-s22.firebaseapp.com",
  projectId: "p5-collective-canvas-s22",
  storageBucket: "p5-collective-canvas-s22.appspot.com",
  messagingSenderId: "630579009295",
  appId: "1:630579009295:web:2b5c1c75dad1105ce4907a"
};

firebase.initializeApp(firebaseConfig);
database = firebase.database();
let ref = database.ref("words");
ref.on("value", gotData, errData);

//  var data ={
//    name: "q",
//    word: "hello"
//  }
// 
// ref.push(data);

var storageRef = firebase.storage().ref("");

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvasContainer');
  background(255);
  noStroke();
  
  //add button
  let saveButton = select("#saveButton");
  saveButton.mousePressed(saveDrawing);
  // saveButton.position(20, 100);
  
   var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);
  
  canvas.drop(gotFile); // drop image to the canvas
}


function saveDrawing() {
  var ref = database.ref("words");
  loadPixels();
  const image64 = canvas.toDataURL();
  // console.log(image64);
  var data = {
    picture: image64
  };
  var result = ref.push(data, dataSent);
  // console.log(result.key);

  function dataSent(status) {
    // console.log(status);
  }
}

function errData(err) {
  // console.log("Error");
  console.log(err);
}

function gotData(data) {
  console.log("GOT DATA FUNCTION");
  
   // clear the listing
  var elts = selectAll('.smallImage');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }
  
   var ref = database.ref("words");
  // console.log(data.val());
  let drawings = data.val();
  let keys = Object.keys(drawings);
  // console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    let k = keys[i];
    let picture = drawings[k].picture;
    console.log(picture);
  
    let allImages = createImg(picture, () => {
      // allImages.size(AUTO, 80);
      // allImages.style("margin-top", 15 + "px");
      // allImages.style("margin-left", 15 + "px");
      // allImages.style("margin-right", 15 + "px");
    });
    allImages.class('smallImage');
    allImages.parent('drawingContainer');
        
  }
}

// inside canvas
function mouseDragged() {
  fill(0);
  circle(mouseX, mouseY, 5);
}

function gotFile(file) {
  let img = createImg(file.data, '').hide();
  // image(img, 0, 0, 200, 200);
  image(img, 0, 0, width, height);
}

function clearDrawing() {
  // clear();
  background(255);
  // console.log("CLEAR CANVAS");
}