import Image from 'next/image'

interface UserPicturesProps {
    arrayPicturesUser: string[];
  }
  
  export default function UserPictures({arrayPicturesUser}: UserPicturesProps) {
  return (
    <>
    <h2 className="text-center text-3xl font-bold my-10">MY PICTURES</h2>
        <div className="hero-content flex-wrap lg:flex-row">
        
{arrayPicturesUser?.map((picture: string, index: number) => {
    let transformedUrl = picture.replace('/upload/', '/upload/w_200,h_300,c_fill,g_auto/'); 
    return (
      <div key={index} style={{ position: "relative", display: "inline-block" }}>
        <Image 
            src={transformedUrl}
            alt={`Uploaded Preview ${index + 1}`}
            width={200}
            height={300}
         
        />

      </div>
    );
})}
        </div>
    </>
  )
}
