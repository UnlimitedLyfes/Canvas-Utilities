console.log("skiptomodule.js working")

const currentURL = window.location.href
console.log(currentURL)
const matcher = /\d+$/

console.log(currentURL.match(matcher))
if (currentURL.match(matcher)){
    window.location.href = currentURL.concat("/modules")
}