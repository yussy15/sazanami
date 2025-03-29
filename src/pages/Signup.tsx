import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [classname, setClassname] = useState("");
  const [classnumber, setClassnumber] = useState("");
  const [name, setName] = useState("");
  const [studentid, setStudentid] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, classname, classnumber, name, studentid }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("登録が完了しました！");
      router.push("/Top");
    } else {
      alert(result.error || "エラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/sazanami_dev.svg" alt="Logo" className="h-16" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">サインアップ</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">メールアドレス:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">クラス名:</label>
            <input
              type="text"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">クラス番号:</label>
            <input
              type="text"
              value={classnumber}
              onChange={(e) => setClassnumber(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">名前:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">学籍番号:</label>
            <input
              type="text"
              value={studentid}
              onChange={(e) => setStudentid(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            登録
          </button>
        </form>
      </div>
    </div>
  );
}
