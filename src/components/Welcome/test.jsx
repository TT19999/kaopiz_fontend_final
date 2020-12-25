import React from 'react'
import Banner from '../Banner'

class Test extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <>
            <Banner
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on the latest posts"
      />
    <section class="cards-wrapper">
  <div class="card-grid-space">

    <a class="card" href="https://codetheweb.blog/2017/10/06/html-syntax/">
      <div>
        <h1>HTML Syntax</h1>
        <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
        <div class="date">6 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
  <div class="card-grid-space">

    <a class="card" href="https://codetheweb.blog/2017/10/09/basic-types-of-html-tags/" style={{backgroundImage: "https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/BG.png"}}>
      <div>
        <h1>Basic types of HTML tags</h1>
        <p>Learn about some of the most common HTML tags…</p>
        <div class="date">9 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
  <div class="card-grid-space">

    <a class="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{backgroundImage: "https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/BG.png"}}>
      <div>
        <h1>Links, images and about file paths</h1>
        <p>Learn how to use links and images along with file paths…</p>
        <div class="date">14 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
  <div class="card-grid-space">

    <a class="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{backgroundImage: "https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/BG.png"}}>
      <div>
        <h1>Links, images and about file paths</h1>
        <p>Learn how to use links and images along with file paths…</p>
        <div class="date">14 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
  <div class="card-grid-space">

    <a class="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{backgroundImage: "https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/BG.png"}}>
      <div>
        <h1>Links, images and about file paths</h1>
        <p>Learn how to use links and images along with file paths…</p>
        <div class="date">14 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
  <div class="card-grid-space">
  
    <a class="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{backgroundImage: "https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/BG.png"}}>
      <div>
        <h1>Links, images and about file paths</h1>
        <p>Learn how to use links and images along with file paths…</p>
        <div class="date">14 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
  <div class="card-grid-space">

    <a class="card" href="https://codetheweb.blog/2017/10/14/links-images-about-file-paths/" style={{backgroundImage: "https://kaopiz-final.s3-ap-southeast-1.amazonaws.com/post/BG.png"}}>
      <div>
        <h1>Links, images and about file paths</h1>
        <p>Learn how to use links and images along with file paths…</p>
        <div class="date">14 Oct 2017</div>
        <div class="tags">
          <div class="tag">HTML</div>
        </div>
      </div>
    </a>
  </div>
</section>
                </>
        )
    }
}

export default Test