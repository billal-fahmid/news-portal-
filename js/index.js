let fetchData=[];

const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategories(data.data))
}
// fetchCategories()
const showCategories = (categories) => {
    // console.log(categories)
    const categoryContainer = document.getElementById('categories-container')
    categories.news_category.forEach(singleCategory => {
        // console.log(singleCategory)
        categoryContainer.innerHTML += `<a class="nav-link" onclick="fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')" href="#">${singleCategory.category_name}</a>`
    })
}

// fetch for all news available 
const fetchCategoryNews = (id, categoryName) => {
    url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data
            showAllNews(data.data, categoryName)
        })
}
const showAllNews = (data, categoryName) => {
    // console.log(data,categoryName);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = categoryName;

    const allNews = document.getElementById('all-news');
    allNews.innerHTML = '';
    data.forEach(singleNews => {
        const { _id, image_url, title, details, author, total_view } = singleNews;
        // console.log(singleNews);
        allNews.innerHTML += `
                <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${image_url
            }" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 d-flex flex-column">
                        <div class="card-body">
                            <h5 class="card-title ">${title}</h5>
                            <p class="card-text">${details.slice(0, 200)}....</p>
                            
                        </div>
                        <div class="card-footer border-0 bg-body d-flex justify-content-between">
                            <div class="d-flex gap-2">
                                <img  src="${author.img
            }" class="img-fluid rounded-circle " alt="..." height="40px" width="40px" border-radius="50%">
                               <div>
                                     <p class="m-0 p-0">${author.name? author.name : 'Not available'}</p>
                                <p class="m-0 p-0">${author.published_date ? author.published_date : 'Not available'}</p>
                               </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-eye"></i>
                                <p class="m-0 p-0">${total_view?total_view : 'Hide'
            }</p>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="d-flex align-items-center">
                                    <i class="fa-solid fa-arrow-right" onclick="loadNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        `
    })
}

const loadNewsDetails = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url).then(res => res.json()).then(data => showNewsDetails(data.data[0]))
    // console.log(url)
}

const showNewsDetails = data => {
    console.log(data)
    const newsDetails =document.getElementById('news-details')
    const { _id, image_url, title, details, author, total_view ,others_info
,rating} = data;
    // console.log(singleNews);
    newsDetails.innerHTML = `
                <div class="card mb-3" >
                <div class="row g-0">
                    <div class="col-md-12">
                        <img src="${image_url
        }" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-12 d-flex flex-column">
                        <div class="card-body">
                            <h5 class="card-title ">${title}<span class="badge text-bg-warning">${others_info.is_trending? "Trending":""}</span>
</h5>
                            <p class="card-text">${details}....</p>
                            
                        </div>
                        <div class="card-footer border-0 bg-body d-flex justify-content-between">
                            <div class="d-flex gap-2">
                                <img  src="${author.img
        }" class="img-fluid rounded-circle " alt="..." height="40px" width="40px" border-radius="50%">
                               <div>
                                     <p class="m-0 p-0">${author.name ? author.name :'Not available'}</p>
                                <p class="m-0 p-0">${author.published_date}</p>
                               </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-eye"></i>
                                <p class="m-0 p-0">${total_view? total_view : 'Not available'
        }</p>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                         
                        </div>
                    </div>
                    
                </div>
            </div>
        `

}

// show the Trending news 
const showTrendingNews=()=>{
    
    let trendingNews = fetchData.filter(singleNews=> singleNews.others_info.is_trending=== true);
    const categoryName = document.getElementById('category-name').innerText;
    // console.log(trendingNews)
    showAllNews(trendingNews,categoryName)
}

// show today picks

const showTodayPick=()=>{
    // console.log(fetchData);
    const todayPicks = fetchData.filter(singleNews=>singleNews.others_info.is_todays_pick===true);
    const categoryName = document.getElementById('category-name').innerText;
    console.log(todayPicks)
    showAllNews(todayPicks, categoryName)
}