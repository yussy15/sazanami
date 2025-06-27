'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import markdownToHtml from 'zenn-markdown-html';
import Header from '../../components/Header';
import styles from '../../../styles/blog.module.css';
import { useSession } from 'next-auth/react';

export default function PreviewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // URLパラメータから投稿データを取得
    const titleParam = searchParams.get('title') || '';
    const contentParam = searchParams.get('content') || '';
    const authorParam = searchParams.get('author') || '';
    
    setTitle(titleParam);
    setContent(contentParam);
    setAuthor(authorParam);

    // マークダウンをHTMLに変換
    if (contentParam) {
      try {
        const html = markdownToHtml(contentParam, {
          embedOrigin: 'https://embed.zenn.studio',
        });
        setHtmlContent(html);
      } catch (error) {
        console.error('Markdown conversion error:', error);
        setHtmlContent('<p>マークダウンの変換でエラーが発生しました。</p>');
      }
    }
  }, [searchParams]);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, author }),
      });

      if (response.ok) {
        router.push('/blog');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    // 投稿中の場合は処理を停止
    if (isSubmitting) return;
    
    // 編集画面に戻る（データを保持）
    const params = new URLSearchParams({
      title,
      content,
      author
    });
    router.push(`/blog/new?${params.toString()}`);
  };

  return (
    <div>
      <Header />
      <div className={`${styles.container} mt-16`}>
      <h1 className={styles.title}>投稿プレビュー</h1>
      
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">
            {author} - {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="znc">
          <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="zenn-content"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleEdit}
          className={`px-6 py-2 rounded-lg text-white ${
            isSubmitting 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          disabled={isSubmitting}
        >
          編集に戻る
        </button>
        <button
          onClick={handleConfirm}
          className={`px-6 py-2 rounded-lg text-white ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '投稿中...' : '投稿する'}
        </button>
      </div>
      </div>
    </div>
  );
}