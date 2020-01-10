// D3 module imports
import * as d3Selection from "d3-selection";
import * as d3Geo from "d3-geo";
import * as d3Interpolate from "d3-interpolate";
import * as d3Transition from "d3-transition";
// Then combine them all into a single d3 var
const d3 = { ...d3Selection, ...d3Geo, ...d3Transition, ...d3Interpolate };

import * as topojson from "topojson-client";
import canvasDpiScaler from "canvas-dpi-scaler";
import * as Papa from "papaparse";

const margin = 100;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let currentRangeInKms = 163.518;
let previousRangeInKms = 0;

let currentLongLat = [133.15399233370441, -24.656909465155994];

import worldMap from "./world-map.js";
import storyData from "./story-data.js";

import ausStatesMap from "./aus-states.topo.json";
import ausMap from "./aus-larger.geo.json";

// import fires from "./fires.json";

const world = topojson.feature(worldMap, worldMap.objects.land);
const land = topojson.feature(ausStatesMap, ausStatesMap.objects.states);
const globe = { type: "Sphere" };

console.log(land);

const body = d3
  .select("body")
  .style("background-color", "#f9f9f9")
  .style("margin", 0);

const canvas = d3
  .select(".world")
  .append("canvas")
  .style("display", "block")
  .attr("width", screenWidth)
  .attr("height", screenHeight)
  .classed("stage", true);

const projection = d3
  // .geoMercator() // D3 Projection
  .geoOrthographic()
  // .clipAngle(90) // Only display front side of the world
  .rotate(invertLongLat(currentLongLat))
  .fitExtent(
    // Auto zoom
    [
      [margin, margin],
      [screenWidth - margin, screenHeight - margin]
    ],
    land
  );

// Context needed to draw on canvas
const context = canvas.node().getContext("2d");

// A non-d3 element selection for Retina dn High DPI scaling
const canvasEl = document.querySelector(".stage");

// Auto-convert canvas to Retina display and High DPI monitor scaling
canvasDpiScaler(canvasEl, context);

const path = d3
  .geoPath()
  .projection(projection)
  .context(context)
  .pointRadius(0.5);

// Set the main point
const initialPoint = getItem("australia").longlat;
// projection.rotate([-initialPoint[0], -initialPoint[1]]);

// A helper function to index an array of objects
function getItem(id) {
  return storyData.find(item => item.id === id);
}

const rangeCircle = d3
  .geoCircle()
  .center(currentLongLat)
  .radius(kmsToRadius(currentRangeInKms));

// Helper to turn kilometres into a D3 radius
function kmsToRadius(kms) {
  return kms / 111.319444; // This many kilometres per degree
}

Papa.parse("http://localhost:1234/fire_archive_V1_95963.csv", {
  download: true,
  header: true,
  step: function(row) {
    const fire = row.data;
    currentFireTime = fire.acq_time;

    fires.push(fire);

    if (previousFireTime === null || currentFireTime === previousFireTime) {
      fireGroup.push(fire);
      previousFireTime = currentFireTime;
    } else {
      fireGroups.push(fireGroup);
      fireGroup = [];
      previousFireTime = currentFireTime;
    }
  },
  complete: function() {
    console.log("CSV parsed...");

    let index = 0;
    let fps = 30;
    let dateLastShown;
    let highlightFrames = 60;

    function repeatOften() {
      // setTimeout(() => {
        // console.log("Frame");

        if (index > highlightFrames - 1) {
          for (const fire of fireGroups[index - highlightFrames]) {
            drawPoint([fire.longitude, fire.latitude], "#111111");
          }
        }

        // if (index > 1) {
        //   for (const fire of fireGroups[index - 1]) {
        //     drawPoint([fire.longitude, fire.latitude], "#ed7b1e");
        //   }
        // }

        for (const fire of fireGroups[index]) {
          // if (Math.random() < 0.001) console.log(fire.acq_date);
          if (!dateLastShown || fire.acq_date !== dateLastShown) {
            console.log(fire.acq_date);
            dateLastShown = fire.acq_date;
          }
          drawPoint([fire.longitude, fire.latitude], "#FF4D00");
        }

        // drawPoint([fires[index].longitude, fires[index].latitude]);

        index++;
        if (index < fireGroups.length) requestAnimationFrame(repeatOften);
      // }, 1000 / fps);
    }
    requestAnimationFrame(repeatOften);
  }
});

// Draw the inital state of the world
drawWorld();

function drawWorld() {
  // Clear the canvas ready for redraw
  // context.clearRect(0, 0, screenWidth, screenHeight);

  // Draw the oceans and the seas
  context.beginPath();
  context.lineWidth = 1.2;
  context.strokeStyle = "#B6CED6";
  context.fillStyle = "#E4EDF0";
  path(globe);
  context.fill();
  context.stroke();

  // Draw all landmasses
  context.beginPath();
  context.strokeStyle = "darkgrey";
  context.fillStyle = "white";
  context.lineWidth = 1.1;
  path(land);
  context.fill();
  context.stroke();

  // Draw circle launch radius
  // context.beginPath();
  // context.strokeStyle = "#FF6100";
  // context.globalAlpha = 0.1;
  // context.fillStyle = "#FF4D00";
  // context.lineWidth = 2.2;
  // path(rangeCircle());
  // context.fill();
  // context.globalAlpha = 1;
  // context.stroke();

  // Draw a circle outline around the world
  // First clear any radius around the outside
  context.beginPath();
  context.strokeStyle = "#f9f9f9";
  context.lineWidth = 12;
  path(globe);
  // context.stroke();

  // Draw a little circle a bit smaller radius
  // We mess with the scale then put it back
  // This is to hide the range border when past clipAngle
  context.beginPath();
  context.strokeStyle = "#B6CED6";
  context.lineWidth = 2;
  projection.scale(projection.scale() - 5);
  path(globe);
  // context.stroke();
  projection.scale(projection.scale() + 5);
}

let fires = [];
let fireGroups = [];
let fireGroup = [];
let previousFireTime = null;
let currentFireTime;

// for (const fire of fires) {
//   currentFireTime = fire.acq_time;

//   if (previousFireTime === null || currentFireTime === previousFireTime) {
//     fireGroup.push(fire);
//     previousFireTime = currentFireTime;
//   } else {
//     fireGroups.push(fireGroup);
//     fireGroup = [];
//     previousFireTime = currentFireTime;
//   }
// }

function drawPoint(longlat, color) {
  // Draw some points
  context.beginPath();
  // context.strokeStyle = color;
  context.globalAlpha = 1.0;
  context.fillStyle = color;
  // context.lineWidth = 2.2;
  // path(rangeCircle());
  path({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: longlat
    },
    properties: {
      name: "Fire"
    }
  });
  context.fill();
  // context.globalAlpha = 1;
}

// The story starts here
let currentStoryPosition = 0;
let storyPositionMax = storyData.length;

// Set initial global scale to handle zoom ins and outs
const initialGlobeScale = projection.scale();

// Set initial position
currentStoryPosition = 1;
doZoom();

body.on("keydown", e => {
  // Advance the story on keydown event
  console.log("Keycode: " + d3Selection.event.keyCode);

  // If back left arrow key go back one
  if (d3Selection.event.keyCode === 37) {
    currentStoryPosition--;
    if (currentStoryPosition < 0) currentStoryPosition = storyPositionMax - 1;
  } else {
    // Otherwise proceed
    currentStoryPosition++;
    if (currentStoryPosition >= storyPositionMax) currentStoryPosition = 0;
  }

  doZoom();
});

function doZoom() {
  // Set ranges
  previousRangeInKms = currentRangeInKms;
  currentRangeInKms = storyData[currentStoryPosition].range;

  // Set rotations
  let previousRotation = projection.rotate();
  let currentRotation = storyData[currentStoryPosition].longlat;

  // Set scales
  let previousScale = projection.scale();
  let currentScale =
    initialGlobeScale * (storyData[currentStoryPosition].scale / 100);

  // Set circle position
  let circlePos = storyData[currentStoryPosition].longlat;
  rangeCircle.center(circlePos);

  console.log("Story position: " + currentStoryPosition);
  console.log(storyData[currentStoryPosition].name);
  // console.log("Missile range: " + currentRangeInKms);
  console.log("Earth's rotation: " + currentRotation);
  console.log("Zoom: " + currentScale);

  let dummyTransition = {};

  d3.select(dummyTransition)
    .transition("transition")
    .delay(0)
    .duration(0)
    .tween("spinner", function() {
      let rotationInterpolate = d3.interpolate(previousRotation, [
        -currentRotation[0],
        -currentRotation[1],
        0
      ]);

      let radiusInterpolate = d3.interpolate(
        kmsToRadius(previousRangeInKms),
        kmsToRadius(currentRangeInKms)
      );

      let scaleInterpolate = d3.interpolate(previousScale, currentScale);

      // Return the tween function
      return function(time) {
        projection.rotate(rotationInterpolate(time));
        rangeCircle.radius(radiusInterpolate(time));
        projection.scale(scaleInterpolate(time));
        drawWorld();
      };
    });
}

function invertLongLat(longlat) {
  return [-longlat[0], -longlat[1]];
}
