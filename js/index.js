const fetchCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res=>res.json())
        .then(data=>showCategories(data.data))
}
// fetchCategories()
const showCategories=(categories)=>{
    console.log(categories)
    const categoryContainer = document.getElementById('categories-container')
    categories.news_category.forEach(singleCategory =>{
        // console.log(singleCategory)
        categoryContainer.innerHTML += `<a class="nav-link" onclick="fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')" href="#">${singleCategory.category_name}</a>`
    })
}

// fetch for all news available 
const fetchCategoryNews=(id,categoryName)=>{
    url=`https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res=>res.json()).then(data=>showAllNews(data.data,categoryName))
}
const showAllNews=(data,categoryName)=>{
    console.log(data,categoryName);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = categoryName;
}