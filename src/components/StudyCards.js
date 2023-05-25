import React from 'react'

function StudyCards(props) {
    const {imgSrc,title, totalQuestions} = props;
  return (
    <section id="hover-img">
    <div class="container py-5">
        <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div class="card overflow-hidden">
            <img src={imgSrc} class="img-fluid" alt="Loading"/>
            <div class="card-body">
                <h5 class="card-title mt-3"><a href="/" class="text-decoration-none text-dark">{title}</a></h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item text-muted"><i class="fa fa-user mr-1" aria-hidden="true"></i>
                Alexander
                <span class="float-right"><i class="fa fa-calendar mr-1" aria-hidden="true"></i>{totalQuestions}</span>
                </li>
            </ul>
            </div>
        </div>
        
       
        </div>
    </div>
    </section>
  )
}

export default StudyCards