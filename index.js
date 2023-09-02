const disableID = `
<div class ="">
            <img class=" mx-auto" src="/Icon.png" alt="">
            <p class="text-5xl font-bold text-center">Oops!! Sorry, There is no <br> content here</p>
        </div>
`
const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const Data = await response.json()
    console.log(Data);
    console.log(Data.data);
    const tabContainer = document.getElementById("tabContainer")
    const mainId = document.getElementById('mainDiv')
    const mainData = Data.data;
    // const disableID = document.getElementById("disableID")
    mainData.forEach((category) => {
        const div = document.createElement('div')
        div.innerHTML = `<a onclick ="displayPage('${category.category_id}')"  class="tab flex flex-cols items-center justify-center mt-8">${category.category}</a>`
        tabContainer.appendChild(div)

    })


}
const displayPage = async (categorieID) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categorieID}`)
    const data = await response.json()
    console.log(data);
    const videoContainer = document.getElementById("videoContainer")
    videoContainer.innerHTML = ""
    const mainDiv = document.getElementById('mainDiv')
    if (data.status) {
        data.data.forEach((video) => {
            // console.log(video);
            const timeSecond = video.others.posted_date
            const hourTime = Math.floor(timeSecond / 3600)
            const minutes = Math.floor((timeSecond - (hourTime * 60 * 60)) / 60)
            
            const div = document.createElement("div")
            div.classList = "card bg-base-100 p-4 shadow-xl"
            div.innerHTML = `
           
                        <figure class = "relative ">
                        <img class ="h-40 w-full" src=${video?.thumbnail} alt="Shoes" />
                        ${timeSecond ? `<p class= "text-white bg-black absolute bottom-2 right-4 text">${hourTime} hour ${minutes} min ago</p>` : ""}
                        </figure>
                        <div>
                        <div class="avatar">
                        <div class="w-10 h-10 mt-10 rounded-full">
                        <img src=${video.authors[0]?.profile_picture} />
                        </div>
                        <div class="card-body ${video.posted_date}">
                            <h2 class="card-title">${video?.title}</h2>
                            <div class="flex flex-cols">
                                <p>${video.authors[0]?.profile_name}</p>
                                <p>${video.authors[0]?.verified ? '<span class ="verified text-cyan-400"><i class="fa-solid fa-certificate"></i></span>' : ""}</p >
                            </div >
                            <p>${video.others?.views}</p>
                        </div >
                        </div>
                    
        `
            videoContainer.appendChild(div)
            mainDiv.classList.add('hidden')
        })
    } else {
        mainDiv.classList.remove('hidden')
    }

}


handleCategory()
displayPage("1000")