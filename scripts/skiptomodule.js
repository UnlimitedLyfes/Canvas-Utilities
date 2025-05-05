console.log('skiptomodule.js working')
chrome.storage.local.get([ 'skipToModules'], (result) => {
    if(skipToModules){
        console.log("skiptomodule.js working")

        const currentURL = window.location.href
        console.log(currentURL)
        const matcher = /courses\/\d+$/
        
        console.log(currentURL.match(matcher))
        if (currentURL.match(matcher)){
            window.location.href = currentURL.concat("/modules")
        }
    }
})
