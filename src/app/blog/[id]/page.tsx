import { Post } from '../../../app/lib/interface/Post';
import Header from '../../components/Header';
import markdownToHtml from 'zenn-markdown-html';

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch post');
  }
  const data = await res.json();
  return data.post;
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return <div>投稿が見つかりません</div>;
  }

  let htmlContent = '';
  try {
    htmlContent = await markdownToHtml(post.content, {
      embedOrigin: 'https://embed.zenn.studio',
    });
  } catch (error) {
    console.error('Markdown conversion error:', error);
    htmlContent = '<p>コンテンツの変換に失敗しました。</p>';
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        {post.author} - {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className = "znc">
      <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className = "zenn-content"
      />
      </div>
      </div>
    </div>
  );
}