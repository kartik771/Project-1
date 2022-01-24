//Help Function will list all the ways by which you can run the code of this project
function helpFn() {
  console.log(`List of all commands->
    1) tree - node FO.js tree <dirPath>
    1) organize - node FO.js organize <dirPath>
    1) help - node FO.js help <dirPath>`);
}

module.exports = {
  helpFnKey: helpFn,
};
