import Link from 'next/link';
import { Post } from '../../app/lib/interface/Post';

type Props = {
  post: Post;
}

export default function BlogPostItem({ post }: Props) {
  return (
    <li className="border p-4 rounded-lg">
      <Link href={`/blog/${post.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
        {post.title}
      </Link>
      <p className="text-gray-600">{post.author} - {new Date(post.createdAt).toLocaleDateString()}</p>
    </li>
  );
}