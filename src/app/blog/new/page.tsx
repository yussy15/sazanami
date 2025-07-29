'use client';

import { useEffect, useState, useRef} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../../components/Header';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if(textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  };

  useEffect(() => {
    if (textareaRef.current && content) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  },[content]);
  
  useEffect(() => {
      if (searchParams.get('title')) {
      setTitle(searchParams.get('title') || '');
      setContent(searchParams.get('content') || '');
      setAuthor(searchParams.get('author') || '');
    }
  }, [searchParams]);
  
 
   const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      title,
      content,
      author
    });
    
    router.push(`/blog/preview?${params.toString()}`);
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
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
        router.refresh();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-4">新規投稿作成</h1>
      <form onSubmit={handlePreview} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-2">内容</label>
          <textarea
          ref = {textareaRef}
          id = "content"
          value = {content}
          onChange = {handleContentChange}
          className = "w-full px-3 py-2 border rounded-lg resize-none overflow-hidden min-h-32"
          required
          disabled={isSubmitting}
            // id="content"
            // value={content}
            // onChange={(e) => setContent(e.target.value)}
            // className="w-full px-3 py-2 border rounded-lg resize-y min-h-32"
            // required
            // disabled={isSubmitting}
          ></textarea>
        </div>
        <div>
          {/* <label htmlFor="author" className="block mb-2">{session?.user?.name}</label> */}

          <label htmlFor="author" className="block mb-2">著者</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
            disabled={isSubmitting}
          />
        </div>
        <button 
          type="submit" 
          className={`px-4 py-2 rounded-lg text-white ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '処理中...' : 'プレビューを確認'}
        </button>
      </form>
      </div>
    </div>
  );
}