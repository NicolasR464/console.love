import Image from 'next/image';

export default function MyMessages() {
  const messageData = [
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
    { name: 'Prénom', message: 'Apercu du message' },
  ];

  return (
    <>
      <div id="myMessages" className="flex-col overflow-scroll h-[80%]">
        {messageData.map((message, index) => (
          <div
            key={index}
            className="flex w-86 mx-4 my-2 border border-white rounded-2xl py-2"
          >
            <div className="avatar online p-2">
              <div className="w-14 h-14 rounded-full">
                <img src="https://xsgames.co/randomusers/avatar.php?g=female" />
              </div>
            </div>
            <div className="text-white px-4 overflow-hidden w-full">
              <h2 className="text-lg font-bold">{message.name}</h2>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
