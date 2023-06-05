import Image from 'next/image'
import ChatBox from './ChatBox';
import UserProfile from './UserProfile';
import Drawer from '../../components/Drawer';
import { SocketProvider } from '../../context/SocketContext';



export default function page({params}: any) {


  const urlRoomId = params;

const { roomId }: any = urlRoomId
console.log('MY ROOM ID', roomId)
  return (


    <main className="flex max-h-screen flex-col items-center justify-between">

<div
          className="hero min-h-screen w-full"
          style={{
            backgroundImage: `url("https://cdn.shopify.com/s/files/1/0295/8036/1827/articles/BLOG_1_fabc8a00-f5a9-41c4-903f-69a7cc2bdeb9.jpg?v=1602242282")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <SocketProvider >

          <Drawer />
          <ChatBox roomId={ roomId } />
         {/* <UserProfile /> */}
         </SocketProvider>

        </div>
          
    

      

    </main>
  )
}
