import { useState } from "react";

export function useMemberForm() {
  const [members, setMembers] = useState<string[]>([""]);

  const addMember = () => setMembers([...members, ""]);

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  return { members, addMember, removeMember, updateMember };
}
