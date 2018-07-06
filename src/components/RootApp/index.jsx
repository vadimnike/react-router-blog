import React from 'react';

import Login from '../Login'
import Navbar from '../Navbar';
import Signup from '../Signup';
import Footer from '../Footer';
import Welcome from '../Welcome';
import SingleArticle from '../SingleArticle';
import CreateArticle from '../CreateArticle';

export const RootApp = ()=>{
  return(
    <div>
      Hellow world!!
      <Navbar />
      <Route exact path="/" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/article/:slug" component={SingleArticle} />
      <Route path="/articles/create" component={CreateArticle} />
      <Footer />
    </div>
  )
}
