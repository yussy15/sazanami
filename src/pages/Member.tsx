import { useEffect, useState } from "react";

type Member = {
  name: string;
  email: string;
  // 必要に応じて他のフィールドも追加
};

export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/member");
        const data = await response.json();
        setMembers(data.members || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-xl font-bold mb-4">Member Page</h1>
      {members.map((member, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded w-1/2">
          <p>名前: {member.name}</p>
          <p>メール: {member.email}</p>
        </div>
      ))}
    </div>
  );
}
