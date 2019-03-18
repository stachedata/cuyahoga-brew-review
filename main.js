const createCarousel = () => {
    const brewCarousel = new Siema({
        selector: '#brews',
        perPage: 3,
        draggable: false,
    })
    document.getElementById('leftButton').addEventListener('click', () => brewCarousel.prev(3))
    document.getElementById('rightButton').addEventListener('click', () => brewCarousel.next(3))
}

const changeTitle = (location) => document.getElementById('title').innerHTML = "Cleveland " + location + "<br>Brew Review"

const brews = []

const newBrew = (cafe,location,drink,rating,info) => {
    let stars
    if(rating == 3) stars = "<br> &#9733 &#9733 &#9733  "
    else if(rating == 2) stars = "<br> &#9733 &#9733 &#9734  "
    else stars = "<br> &#9733 &#9734 &#9734  "

    const brew = {
        cafe: cafe,
        location: location,
        drink: drink,
        rating: rating,
        stars: stars,
        info: info,
        print() {
            return this.cafe + "<br>" + this.drink + this.stars
        }
    }
    brews.push(brew)
} 

const printBrews = (brews) => {
    changeTitle('')
    removeBrews()
    brews.sort((a,b) => b.rating - a.rating)

    brews.map(brew => {
        const brewDiv = document.createElement('div')
        brewDiv.className = 'brew'

        if(brew.rating >= 1) {
            if(document.getElementById('topBrew').innerHTML == ""){
                brewDiv.innerHTML = brew.print()
                document.getElementById('topBrew').appendChild(brewDiv) 
            }else{
                brewDiv.innerHTML = brew.print()
                document.getElementById('brews').appendChild(brewDiv)
            }
        }
        else if(brew.rating == 2){
            brewDiv.innerHTML = brew.print()
            document.getElementById('brews').appendChild(brewDiv)
        }
        else{
            brewDiv.innerHTML = brew.print()
            document.getElementById('brews').appendChild(brewDiv)
        }

        brewDiv.setAttribute("info", brew.location + "<br>" + brew.info)
        brewDiv.addEventListener('click', () => {
            if(brewDiv.getAttribute("info") == brewDiv.innerHTML) {
                brewDiv.innerHTML = brewDiv.getAttribute("og");
            } 
            else {
                brewDiv.setAttribute("og", brewDiv.innerHTML);
                brewDiv.innerHTML = brewDiv.getAttribute("info");
            }
        })
    }) 
    createCarousel()
}

const removeBrews = () => {
    const allBrews = document.getElementsByClassName("allBrews")
    while(allBrews[0].firstChild && allBrews[1].firstChild){
        allBrews[0].removeChild(allBrews[0].firstChild)
        allBrews[1].removeChild(allBrews[1].firstChild)
    }
}

newBrew('Rising Star', "Downtown", 'Iced Mocha', 3, "Super good.")
newBrew("Pheonix", "Westside", "Hot Mocha", 3, "Very nice.")
newBrew("Duck Rabbit", "Eastside", "Espresso", 1, "hi")
newBrew("Rising Star", "Downtown", "Coffee", 2, "hi")
newBrew("Pour", "Eastside", "Not Mocha", 1, "It's ok.")
newBrew("7-Eleven", "Downtown", "Coffee", 1, "hi")
newBrew("QuickStop", "Downtown", "Coffee", 1, "hi")
printBrews(brews)

let maps = document.querySelectorAll('path')
let lastClickedMap
maps.forEach((map,i) => {
    map.addEventListener('click', () => {
		if(lastClickedMap != undefined) maps[lastClickedMap].setAttribute("fill", "transparent")
        if (map.getAttribute("fill") == "transparent" && map != maps[lastClickedMap]){   
			lastClickedMap = i
			map.setAttribute("fill", "#F4F4F6")
            sortBrewsByLocation(map.getAttribute("alt"),brews)
        }
        else{
			lastClickedMap = undefined
			map.setAttribute("fill", "transparent")
            printBrews(brews)
        }
    })
})

const sortBrewsByLocation = (name,brews) => {
    removeBrews()
    let sortedBrews = []
    brews.map(brew => {
        if (name == brew.location) sortedBrews.push(brew)
    })
    printBrews(sortedBrews)
    changeTitle(name)
}