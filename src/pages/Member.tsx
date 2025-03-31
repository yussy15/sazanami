import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { withAuth } from '../utils/withAuth';

type Member = {
  name: string;
  email: string;
  class_name: string;
  class_number: string;
  student_id: string;
  role: string;
}

function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const { data: session } = useSession();

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

  if (!session) {
    return <p>認証されていません。ログインしてください。</p>;
  }
  return (
    <div className="mt-20 flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-xl font-bold mb-4">Member Page</h1>
      {members.map((member, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded w-full">
          <p>名前: {member.name}</p>
          <p>{(member.email)? `メール:${member.email}`:<div></div>}</p>
          <p>{(member.class_name)? `クラス名:${member.class_name}`:<div></div>}</p>
          <p>{(member.class_number)? `クラス番号:${member.class_number}`:<div></div>}</p>
          <p>{(member.student_id)? `学籍番号:${member.student_id}`:<div></div>}</p>
          <p>{(member.role)? `ロール:${member.role}`:<div></div>}</p>
        </div>
      ))}
    </div>
  );
}

export default withAuth(MemberPage);
