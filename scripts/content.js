console.log("autonext content.js working")

const waitForNext = (selector, callback) => {           
    const observer = new MutationObserver(() => {  // create observer and do this if it finds something changed
        const target = document.querySelector(selector)
        if(target){
            observer.disconnect()
            setTimeout(() => callback(target), 0) //wait for observer to disconnect kasi nag loloop siya parang tanga, 0 waittime since hindi priority ang setTimeout (macrotask)
        }
    })
    
    observer.observe(document.body, {       // observe document.body
        childList: true, //watch for children being added or removed
        subtree: true // watch not just immediate children, but all nested elements too
    })
}



waitForNext(".module-sequence-footer-right", (target) => {
    const nextDiv = target
    console.log("Found nextDiv")

    const nextButton = nextDiv.querySelector(".css-iclrqq-view--inlineBlock-baseButton")


    chrome.storage.local.get({skipState: "false"}, (result) => {
        if(result.skipState == "true"){
            nextButton.click()
        }
    })

    


    nextDiv.appendChild(createSkipElement())

})

function createSkipElement(){
    const newElement = document.createElement("input")
    newElement.type = "image";
    newElement.src = `${chrome.runtime.getURL('icon.png')}`
    newElement.style.height = "26px"
    newElement.style.padding = "7px 5px 0 0"
        newElement.addEventListener("click", () => {
        chrome.storage.local.set({ skipState: "true" })
        console.log(`clicked`)
    })
    return newElement
}

