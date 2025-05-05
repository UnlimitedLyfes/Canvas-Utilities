console.log('popup.js working')
document.addEventListener('DOMContentLoaded', () => {
    console.log('popup.js fired')
    const skipToModules_toggle = document.getElementById('skip-to-modules_toggle')

    chrome.storage.local.get(['skipToModules'], (result) => {
        skipToModules_toggle.checked = result.skipToModules || false
    })

    skipToModules_toggle.addEventListener('change', () => {
        console.log('change fired')
        chrome.storage.local.set({ skipToModules: skipToModules_toggle.checked})
    })
})
