'use client';
import Image from 'next/image'
import ChatBox from './ChatBox';
import UserProfile from './UserProfile';

export default function ConsoleLove() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-between absolute w-full">
      <div className="flex w-[72%] mt-28 absolute right-8">
        <ChatBox />
        <UserProfile />
      </div>
    </main>
  )
}
