import Link from 'next/link';
import { Post } from '../../app/lib/interface/Post';
import Header from '../components/Header';
import styles from '../../styles/blog.module.css';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await res.json();
  return data.posts;
}

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>ブログ投稿一覧</h1>
      <ul className="space-y-4">
        {posts.map((post: Post) => (
          <li key={post.id} className="border p-4 rounded-lg">
            <Link href={`/blog/${post.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className={styles.subtitle}>{post.author} - {new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}