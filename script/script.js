
console.log('script added')

// Time management

function timeCalculation(time){
    // const day = parseInt(time/86400);
    // let remainingDay = time % 86400;
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minutes = parseInt(remainingSecond /60);
    let seconds = parseInt(remainingSecond % 60);
        // ${day} day
    return `${hour} hours ${minutes} minutes ${seconds} seconds ago` ;
}
// console.log(timeCalculation(206959))



// sorting

 // fetch the data
    // fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?`)
    //     .then((res) => res.json())
    //     // .then(data => displayVideos(data.videos))
    //     .then(data => console.log(data.videos[0].others.views))
    //     .catch((error) => console.log(error));



// const sortBtn = document.getElementById('sortBtn');

//     const sortVideos = video;
//     console.log(sortVideos)











// 1. fetch, load and show categories on html


// create loadCategories
const loadCategories = () => {

    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error));

}
// sorting




let videoData = [];



// create loadVideos
const loadVideos = async (searchText = '') => {

    // fetch the data
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        let data = await res.json();
        displayVideos(data.videos);

        // .then(data => displayVideos(data.videos))
        // .then(data => console.log(data))
        // .catch((error) => console.log(error));
        videoData = data.videos;
        // console.log(data.videos)
        // sorting


        console.log(videoData)

       
        

}

// sorting data

const sortingData = ()=>{
    const sorting = videoData.sort((a , b) => {
        const sort1 = parseInt(a.others.views.replace(/[^\d]/g,""));
        const sort2 = parseInt(b.others.views.replace(/[^\d]/g,""));
        return sort2 - sort1
    });
    displayVideos(sorting);
}



const removeActiveClass = ()=>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

const loadCategoriesVideos = (id) =>{
    // alert(id);
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then(data => {
            // remove all active class
            removeActiveClass();

            // add active class
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error));
}

const loadDetails = async (videoId)=>{
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video)
}

const displayDetails = (video) =>{
    console.log(video);
    const detailContainer = document.getElementById('modal-content');


    detailContainer.innerHTML = `
        <img src = "${video.thumbnail}" />
        <p>${video.description}</P>
    `

    document.getElementById('customModal').showModal();


}

// const cardDemo ={
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


// create displayVideos

const displayVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML ="";

    if(videos.length===0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML=`
            <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center" >
            <img src="assets/Icon.png" />
            <h2 class="text-center text-xl font-bold">Oops!! Sorry, There is No </br> Content Here</h2>
            </div>
            `;
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }

    videos.forEach((video) => {
        // console.log(video);

        const card = document.createElement('div');
        card.classList = "card"
        card.innerHTML = `
       
  <figure class="h-[200px] rounded-xl relative">
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white text-xs">${timeCalculation(video.others.posted_date)}</span>`
            };
        

  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" />` : ""}
        
    </div>
    <p>
    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button>
    </p>
    </div>
    
  </div>

        `;
        videoContainer.append(card)
    })
}

// Create displayCategories
const displayCategories = (categories) => {
    // button container 
    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {
        // console.log(item)
        // create a button

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick= "loadCategoriesVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
            </button>
        `;


        // add button to category container
        categoryContainer.append(buttonContainer);
    });
}


document.getElementById('search-input').addEventListener("keyup", (e)=>{
    loadVideos(e.target.value)
});


loadCategories();
loadVideos();