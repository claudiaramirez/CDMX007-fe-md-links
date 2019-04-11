//console.log(links)
const uniqueCount = (links) => {
  let arr = [];
  count = 0;
  for (let i = 0; i < links.length; i++) {
    for (let j = i + 1; j < links.length; j++) {
      if (links[i].href == links[j].href) {
        arr.push(links[j].href);
        count++;
      }
    }
  }
  let unique = links.length - count;
  return unique;
};
module.exports.uniqueCount = uniqueCount;
