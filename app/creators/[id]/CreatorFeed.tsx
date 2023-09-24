'use client'
import { useMyContext } from '@/context/appcontext';
import React from 'react';

const CreatorFeed = () => {
  // Replace this with your actual post data
  const { myInteger } = useMyContext();


  const isSubscribed = true;

  const posts = [
    {
      id: 1,
      creatorImage: '/images/icons/iconmain-128x128.png',
      content: 'This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.This is the content of the first post.',
    },
    {
      id: 2,
      creatorImage: '/images/icons/iconmain-128x128.png',
      content: 'This is the content of the second post.',
    },
    // Add more posts as needed
  ];

  return (
    // <div className="p-4 bg-gray-600"> {/* Gray background for the feed */}
    //   {posts.map((post) => (
    //     <div key={post.id} className="flex items-start mb-4">
    //       <div className="w-12 h-12 min-w-6 rounded-full overflow-hidden">
    //         <img
    //           src={post.creatorImage}
    //           alt="Creator Image"
    //           className="object-cover w-full h-full"
    //         />
    //       </div>
    //       <div className="flex-grow p-4 bg-white rounded shadow-md">
    //         <p>{post.content}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="rounded overflow-hidden border w-full bg-gray-800 mx-3 md:mx-0 lg:mx-0">
        {isSubscribed ? posts.map(( post,i) => (
            <>
                <div className="w-full flex justify-between p-3">
                <div className="flex">
                  <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                  <img
            src={`/images/pic${myInteger}.gif`} // Replace with the path to your image
            alt="Creator Image"
            width={48} // Set the desired width
            height={48} // Set the desired height
        />
           </div>
                </div>
                <span className="px-2 hover:bg-gray-300 cursor-pointer rounded"><i className="fas fa-ellipsis-h pt-2 text-lg"></i></span>
              </div>
              <img className="w-full bg-cover" src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG" />
              <div className="px-3 pb-2">
                <div className="pt-1">
                  <div className="mb-2 text-sm">
                    <span className="font-medium mr-2">braydoncoyer</span> Lord of the Rings is my favorite film-series. One day I make my way to New Zealand to visit the Hobbiton set!
                  </div>
                </div>
              </div>
            </>
        )) :
        <>
        <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
          <img
            src={`/images/pic${myInteger}.gif`} // Replace with the path to your image
            alt="Creator Image"
            width={48} // Set the desired width
            height={48} // Set the desired height
        />          </div>
        </div>
        <div className="w-full flex gray-800 justify-center items-center p-3" style={{ height: '200px' }}>
        <span style={{ fontSize: '24px' }}>Subscribe to unlock</span>
      </div>
      </div>
    </>

    //     <div className="w-full flex gray-800 justify-center items-center p-3" style={{ height: '200px' }}>
    //     Subscribe to unlock
    //   </div>


    }
  </div>
  );
};

export default CreatorFeed;