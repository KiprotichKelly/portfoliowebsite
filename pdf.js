const url = 'cv/Kelly Kiprotich_Resume.pdf'

let pdfDoc =null,
pageNum = 1,
PageIsRendering =false,
pageNumIsPending =null;



const scale = 1.5,
canvas =document.querySelector('#pdf-render'),
ctx = canvas.getContext('2d');

//Render the page
const renderPage = num =>{
PageIsRendering = true;


//get the page
pdfDoc.getPage(num).then(page =>{
   //setscale
   const viewport = page.getViewport({ scale });
   canvas.height = viewport.height;
   canvas.width = viewport.width;

   const renderCtx = {
    canvasContext: ctx,
    viewport
   };
   page.render(renderCtx).promise.then(()=>{
    PageIsRendering = false;

    if(pageNumIsPending !==null){
        renderPage(pageNumIsPending);
        pageNumIsPending = null;

    }
   });

   
   //output current page
document.querySelector('#page-num').textContent =num;
});
};
//check for pages rendering
const queueRenderPage = num =>{
    if(PageIsRendering){
        pageNumIsPending = num;
    }else{
        renderPage(num);
    }
}

//show previous page
const ShowPrevPage = () =>{
    if(pageNum <=1){
        return;
    }
    pageNum--;
    queueRenderPage(pageNum)
}  

//show Next page
const ShowNextPage = () =>{
    if(pageNum >= pdfDoc.numPages){
        return;
    }
    pageNum++;
    queueRenderPage(pageNum)
}
//get the document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ =>{
pdfDoc = pdfDoc_;

document.querySelector('#page-count').textContent =pdfDoc.numPages

renderPage(pageNum)
})
.catch(err =>{
    //Display error
    const div = document.createElement('div');
    div.className= 'error';
    div.appendChild(document.createTextNode(err.message));
    document.querySelector('body').insertBefore(div,canvas);
    document.querySelector('.top-bar').style.display = 'none';
});


//button events
document.querySelector('#prev-page').addEventListener('click',ShowPrevPage);
document.querySelector('#next-page').addEventListener('click',ShowNextPage);