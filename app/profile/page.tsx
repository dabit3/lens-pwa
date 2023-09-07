'use client'
import {
  useActiveProfile
} from '@lens-protocol/react-web'

export default function Search() {
  const { data: profile } = useActiveProfile()
  
  if (!profile) return null

  return (
    <main className="px-10 py-14">
      <div>
        <a
          rel='no-opener'
          target='_blank'
        href={`https://share.lens.xyz/u/${profile.handle}`}>
          <div className='border rounded-lg p-10'>
            <div>
              <img
                  src={profile?.picture?.original?.url}
                  className='rounded w-[200px]'
              />
            </div>
            <div className='mt-4'>
              <p className='text-primary font-medium'>
                {profile?.handle}
              </p>
            </div>
          </div>
        </a>
     </div>
    </main>
  )
}