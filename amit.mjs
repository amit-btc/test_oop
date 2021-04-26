import parseUserInput from "./helpers/parseUserInput.mjs";
import readline from "readline";

const App = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter your data in this format - <user x coordinate> <user y coordinate> <shop data url> Example - \n \n \n  47.6 -122.4 https://raw.githubusercontent.com/allinfra-ltd/test_oop/master/coffee_shops.csv?token=AA5HVELWEJRKDGHELZ6232DAOHE54  \n  \n  \n",
    (data) => {
      parseUserInput(data);
    }
  );
};

App();