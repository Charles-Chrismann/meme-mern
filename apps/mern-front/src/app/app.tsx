// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.scss';

export function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts))
  }, [])
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 && <p>No posts found</p>}
      {posts.length > 0 && 
      <ul>
        {posts.map((post: {author: string, title: string, body: string}, index) => (
          <li key={index}>
            <h2>{post.title} - by {post.author}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>}
    </div>
  );
}

export default App;
