import { useSelector } from "react-redux"
import Post from "./Post"

const Posts = () => {

const {posts} = useSelector(store => store.post);

const reversedPosts = [...posts].reverse(); // show the newest post first

if(posts.length === 0) {
  return <h1 className="font-semibold text-2xl">No Reviews Available</h1>
}

  return (
    <div>
       { reversedPosts.map((post, index) => <Post key={index} post={post} />)}
    </div>
  )
}

export default Posts