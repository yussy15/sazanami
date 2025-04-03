"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Member = {
  name: string;
  email: string;
  class_name: string;
  class_number: string;
  student_id: string;
  role: string;
};

export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/member");
        const data = await response.json();
        setMembers(data.members || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }

    if (session) {
      fetchMembers();
    }
  }, [session]);

  if (!session) {
    return <p>認証されていません。ログインしてください。</p>;
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-xl font-bold mb-4">Member Page</h1>
      {members.map((member, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded w-full">
          <p>名前: {member.name}</p>
          {member.email && <p>メール: {member.email}</p>}
          {member.class_name && <p>クラス名: {member.class_name}</p>}
          {member.class_number && <p>クラス番号: {member.class_number}</p>}
          {member.student_id && <p>学籍番号: {member.student_id}</p>}
          {member.role && <p>ロール: {member.role}</p>}
        </div>
      ))}
    </div>
  );
}
