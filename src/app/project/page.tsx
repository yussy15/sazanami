// app/project/page.tsx

'use client'; // クライアントコンポーネントとして指定

import React, { useState, useEffect } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態
  const [newProjectName, setNewProjectName] = useState(""); // 新しいプロジェクト名
  const [newProjectDescription, setNewProjectDescription] = useState(""); // 新しいプロジェクトの説明

  useEffect(() => {
    // ここでプロジェクト一覧を取得するロジックを追記
    setProjects([{ id: 1, name: "サンプルプロジェクト", description: "これはサンプルプロジェクトです。" }]);
  }, []);

  const handleCreateProject = () => {
    // モーダルを開く
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    // プロジェクト作成のロジックや画面遷移を追加
    if (newProjectName.trim() === "") {
      alert("プロジェクト名を入力してください");
      return;
    }

    const newProject = {
      id: projects.length + 1, // 仮のID
      name: newProjectName,
      description: newProjectDescription,
    };
    setProjects([...projects, newProject]);
    setNewProjectName(""); // 入力フィールドをリセット
    setNewProjectDescription(""); // 説明フィールドをリセット
    setIsModalOpen(false); // モーダルを閉じる
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // モーダルを閉じる
  };

  return (
    <div className="pt-20 px-4">
      <h1 className="text-xl font-bold mb-4">所属しているプロジェクト</h1>
      <ul>
        {projects.map((project) => (
          <div
            className="flex items-center justify-between bg-white p-4 shadow-md rounded mb-2"
            key={project.id}
          >
            <li className="text-lg font-bold">{project.name}</li>
            <p className="text-sm text-gray-600">{project.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              プロジェクト詳細
            </button>
          </div>
        ))}
      </ul>
      <button
        onClick={handleCreateProject}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        プロジェクトを作成する
      </button>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">新しいプロジェクトを作成</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="プロジェクト名を入力"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <textarea
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder="プロジェクトの説明を入力"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveProject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}