import React, { useState, useEffect } from "react";

type Project = {
  id: number;
  name: string;
};

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // ここでプロジェクト一覧を取得するロジックを追記してください
    setProjects([{ id: 1, name: "サンプルプロジェクト" }]);
  }, []);

  const handleCreateProject = () => {
    // プロジェクト作成のロジックや画面遷移を追加してください
    alert("プロジェクト作成ボタンが押されました");
  };

  return (
    <div className="pt-20 px-4">
      <h1 className="text-xl font-bold mb-4">所属しているプロジェクト</h1>
      <ul>
        {projects.map((project) => (
          <div className="flex items-center justify-between bg-white p-4 shadow-md rounded mb-2" key={project.id}>
            <li className="text-lg">{project.name}</li>
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
    </div>
  );
}
