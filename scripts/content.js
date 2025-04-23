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

    //const nextButton = nextDiv.querySelector(".css-iclrqq-view--inlineBlock-baseButton")


    const newElement =  document.createElement("span")
    newElement.style.background = `url(${chrome.runtime.getURL("icon.png")}) no-repeat`;
    newElement.style.backgroundSize = "contain"
    newElement.style.display = "inline-block"
    newElement.style.width = "100px"; // or whatever size your icon is
    newElement.style.height = "100px";
    nextDiv.appendChild(newElement)

    console.log("Inserted")

   
})



