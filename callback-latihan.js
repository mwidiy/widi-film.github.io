// pencarian 
// val= nilai
// $('.search-button').on('click',function(){
//     $.ajax({
//         url:'http://www.omdbapi.com/?apikey=21917ccc&s=' + $('.input-keyword').val(),
//         success: hasil => {
//             const movis= hasil.Search;
//             let card='';
//             movis.forEach(m => {
//                 card+= showCard(m);
                 
//             });
    
//             $('.movis-container').html(card);
    
//             // ketika tombol detail di click
//             $('.modal-detail-button').on('click',function(){
//                 $.ajax({
//                     url:'http://www.omdbapi.com/?apikey=21917ccc&i='+ $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail= showMovieDetail(m);
                        
//                         $('.modal-body').html(movieDetail);
//                     },
    
//                     error: () => alert('eror 404')
//                 });
//             });
//         },
//         error: () => {
//             console.log('eror 404')
//         }
//     });

// });




// versi fetch 
// json() = mengubah bentuk menjadi promise
const searchButton= document.querySelector('.search-button');
const imputKeyword= document.querySelector('.input-keyword');
searchButton.addEventListener('click',function(){
    fetch('http://www.omdbapi.com/?apikey=21917ccc&s='+imputKeyword.value)
    .then(response => response.json())
    .then(response => {
        const movis= response.Search;
        let card='';
        movis.forEach(m => {
          card+= showCard(m);
                 
        });
        const film = document.querySelector('.movis-container');
        film.innerHTML=card

        // ketika tombol detail di click
        // dataset = yg ada data didepannya ,  .imdbid = yg nama nya ....
        const detailTombol = document.querySelectorAll('.modal-detail-button');
        detailTombol.forEach(m => {
            m.addEventListener('click',function(){
                const imdbid = this.dataset.imdbid;
                fetch('http://www.omdbapi.com/?apikey=21917ccc&i='+imdbid)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    const movieDetail= showMovieDetail(response);   
                    const modalBody = document.querySelector('.modal-body')
                    modalBody.innerHTML = movieDetail
                })
                .catch(response => alert('error 404 not found'))
            });
        });
    })
    .catch(response => alert('error 404 not found'));

});







// // versi revactor(rapi)
// const searchButton= document.querySelector('.search-button');
// searchButton.addEventListener('click', async function(){
//  try{
//    const imputKeyword= document.querySelector('.input-keyword');
//    const movis = await getMovis(imputKeyword.value);
//    console.log(movis)
//    updateUi(movis);
//  } catch(err){
//     alert(err)
//  }
// });


// //info detail
// // even bainding = mengasih evend sebelum evend nya ada (masih tetap berfungsi)
// document.addEventListener('click',function(e){
//     if(e.target.classList.contains('modal-detail-button')){
//         const imdbid = e.target.dataset.imdbid;
//         console.log('coba')
//         const detail = getDetail(imdbid);
//         updateUi(detail)
//     }
// });
















// hasil.Search = menghilangkan search nya

// if( != kalo tidak gitu(ok))
// trow = melempar eror
function getMovis(keyword){
return   fetch('http://www.omdbapi.com/?apikey=21917ccc&s='+keyword)
         .then(response => {
            if( !response.ok){
                throw new Error(response.statusText)
            }else{
                return response.json()
            }
         })
         .then(response => {
            if( response.Response === "False"){
                throw new Error(response.Error)
            }
            return response.search
         });  
};



function updateUi(movis){
    let card='';
    movis.forEach(m => {
    card+= showCard(m);             
    });
    const film = document.querySelector('.movis-container');
    film.innerHTML=card
};



function getDetail(detail){
   fetch('http://www.omdbapi.com/?apikey=21917ccc&i='+detail)
   .then(response => response.json())
   .then(response => {
     console.log(response)
     const movieDetail= showMovieDetail(response);   
     const modalBody = document.querySelector('.modal-body')
     modalBody.innerHTML = movieDetail
   })
};



function showCard(m) {
    return `<div class="col-md-3 my-5  ">
             <div class="card">
              <img src="${m.Poster}" class="card-img-top" >
              <div class="card-body">
               <h5 class="card-title">${m.Title}</h5>
               <h6 class="card-subtitle mb-2 text-muted ">${m.Year}</h6>
               <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">show   details</a>
              </div>
             </div>
            </div>`
};

function showMovieDetail(m){
    return `<div class="container-fluid">
             <div class="row">
              <div class="col-md-3">
               <img src="${m.Poster}" class="img-fluid">
              </div>
              <div class="col-md">
               <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year}</h4></li>
                <li class="list-group-item"><strong>${m.Director} </strong></li>
                <li class="list-group-item"><strong>${m.Actors} </strong></li>
                <li class="list-group-item"><strong>${m.Writer} </strong></li>
                <li class="list-group-item"><strong>${m.Plot} </strong></li>
               </ul>
              </div>
             </div>
            </div>`
};

