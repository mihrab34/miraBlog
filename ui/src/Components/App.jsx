import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import BlogHeader from "./BlogHeader";
import PostList from "./Post/PostList";
import PostDetail from "./Post/PostDetail";
import PopularPost from './Post/PopularPost';
import LatestPost from './Post/LatestPost';
import PostForm from './Post/PostForm';

import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <BlogHeader />
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7 col-sm-12">
                <Routes>
                  <Route path="/" exact element={<PostList />} />
                  <Route path="/post/:id" element={<PostDetail />} />
                  <Route path="/post/add" element={<PostForm action={"add"} />} />
                </Routes>
              </div>
              <div className="col-lg-4 col-md-5 col-sm-12">
                <PopularPost />
                <LatestPost />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
