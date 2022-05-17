import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import BlogHeader from "./BlogHeader";
import PostList from "./PostList/PostList";

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
              <div className="col-8">
                <Routes>
                <Route path="/" exact element={<PostList />} />
                </Routes>
              </div>
              <div className="col-4">
                <PostList />
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
