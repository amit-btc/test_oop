import calculateDistance from "./calculateDistance.mjs";
import getScript from "./fetchRemoteFile.mjs";

const parseUserInput = async (data) => {
  // initalize defaults;
  let userUrl = "";
  let userLat = "";
  let userLong = "";
  let fileData = null;
  let finalObject = {};

  // parse user input data
  data = data.trim().split(" ");
  userLat = data[0];
  userLong = data[1];
  userUrl = data[2];

  // fetch file from url and read file data
  fileData = await getScript(userUrl);
  fileData = fileData.split("\n");

  fileData.map((item) => {
    console.log(item.split(","));
    let coffeeStoreName = item.split(",")[0];
    let coffeeStoreLat = item.split(",")[1];
    let coffeeStoreLong = item.split(",")[2];
    let distance = calculateDistance(
      parseFloat(coffeeStoreLat),
      parseFloat(userLat),
      parseFloat(coffeeStoreLong),
      parseFloat(userLong)
    );
    finalObject[distance] = coffeeStoreName;
  });
  const sortedDistanceArray = Object.keys(finalObject)
    .sort(function (a, b) {
      return parseFloat(a) - parseFloat(b);
    })
    .slice(0, 3);
  sortedDistanceArray.map((item) => {
    console.log(finalObject[item], ",", parseFloat(item).toFixed(4));
  });
};

export default parseUserInput;
