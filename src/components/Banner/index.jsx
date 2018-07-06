import React from 'react';


export const Banner = ({backgroundImage, title, subTitle})=>{
  return(
    <header className="header header-inverse" style={{backgroundImage}} data-overlay={8}>
      <div className="container text-center">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <h1>{title}</h1>
            {subTitle && <p className="fs-20 opacity-70">{subTitle}</p>}
          </div>
        </div>
      </div>
    </header>
  )
};


// backgroundImage: 'url(assets/img/bg-gift.jpg)'}

//title: Latest Blog Posts

//subtitle: Read and get updated on how we progress.