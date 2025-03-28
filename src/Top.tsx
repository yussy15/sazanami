import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Top: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 認証されていない場合、ホームページ（/）にリダイレクト
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>トップページ</h1>
      {isAuthenticated ? (
        <p>認証成功</p>
      ) : (
        <p>ログインしていません。</p>
      )}
    </div>
  );
};

export default Top;
