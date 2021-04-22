const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userUrl = "";
let userLat = "";
let userLong = "";
let fileData = null;
let finalObject = {};

const getScript = (url) => {
  return new Promise((resolve, reject) => {
    const http = require("http"),
      https = require("https");
    let client = http;
    if (url.length === 0) {
      return;
    }
    if (url.toString().indexOf("https") === 0) {
      client = https;
    }
    client
      .get(url, (resp) => {
        let data = "";
        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const calculateDistance = (lat1, lat2, long1, long2) => {
    let d;
    let deltaLat = lat2 - lat1;
    let detltaLong = long2 - long1;
    d = Math.sqrt(Math.pow(deltaLat, 2) + Math.pow(detltaLong, 2));
    return d;
  };

rl.question(
  "Enter your data in this format - <user x coordinate> <user y coordinate> <shop data url> Example - \n \n \n  47.6 -122.4 https://raw.githubusercontent.com/allinfra-ltd/test_oop/master/coffee_shops.csv?token=AA5HVELWEJRKDGHELZ6232DAOHE54  \n  \n  \n",
  (data) => {
    parseUserInput(data);
  }
);
const parseUserInput = async (data) => {
  data =
    "47.6 -122.4 https://raw.githubusercontent.com/allinfra-ltd/test_oop/master/coffee_shops.csv?token=AA5HVELWEJRKDGHELZ6232DAOHE54";
  data = data.trim().split(" ");
  userLat = data[0];
  userLong = data[1];
  userUrl = data[2];

  fileData = await getScript(userUrl);
  fileData = fileData.split("\n");
  fileData.map((item) => {
    // console.log(item.split(","));
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
//   console.log(finalObject);
  const sortedDistanceArray = Object.keys(finalObject).sort(function (a, b) {
    return parseFloat(a) - parseFloat(b);
  }).slice(0,3);
  sortedDistanceArray.map((item => {
    console.log(finalObject[item],",",parseFloat(item).toFixed(4));
  }));
};

// parseUserInput("");


rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
