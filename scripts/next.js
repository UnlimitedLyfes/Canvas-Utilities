console.log("next.js working")



waitForNext(".module-sequence-footer-right", (target) => {
    const nextDiv = target
    console.log("Found nextDiv")

    checkIfNextShouldStop()

    const nextButton = nextDiv.querySelector("a")


    chrome.storage.local.get({skipState: "false"}, (result) => {
        if(result.skipState == "true"){
            nextButton.click()
        }
    })

    


    nextDiv.appendChild(createSkipElement(nextButton))

})


function waitForNext(selector, callback) {           
    const observer = new MutationObserver(() => {  // create observer and do this if it finds something changed
        const target = document.querySelector(selector)
        if(target){
            observer.disconnect()
            clearTimeout(timeoutForMissingNext)
            setTimeout(() => callback(target), 0) //wait for observer to disconnect kasi nag loloop siya parang tanga, 0 waittime since hindi priority ang setTimeout (macrotask)
        }
    })
    
    observer.observe(document.body, {       // observe document.body
        childList: true, //watch for children being added or removed
        subtree: true // watch not just immediate children, but all nested elements too
    })

    const timeoutForMissingNext = setTimeout(() =>{
        chrome.storage.local.set({ skipState: "false" })
    }, 2000)
}


function createSkipElement(nextButton){
    const newElement = document.createElement("input")
    newElement.type = "image";
    newElement.src = `${chrome.runtime.getURL('icon.png')}`
    newElement.style.height = "26px"
    newElement.style.padding = "7px 5px 0 0"
        newElement.addEventListener("click", () => {
        chrome.storage.local.set({ skipState: "true" })
        console.log(`clicked`)
        nextButton.click()
    })
    return newElement
}

function checkIfNextShouldStop(){
    const checkThisForFinishNext = document.querySelector('.lock_explanation')
    if(checkThisForFinishNext){
        chrome.storage.local.set({ skipState: "false" })
        console.log(`stopping nexts`)
    }
}