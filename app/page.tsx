'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType
} from '@lens-protocol/react-web'

import {
  Loader2, ListMusic, Newspaper,
  PersonStanding, Shapes,
  MessageSquare, Repeat2, Heart, Grab, ArrowRight
} from "lucide-react"
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from 'react-markdown'

enum PublicationMetadataMainFocusType {
  Article = "ARTICLE",
  Audio = "AUDIO",
  CheckingIn = "CHECKING_IN",
  Embed = "EMBED",
  Event = "EVENT",
  Image = "IMAGE",
  Link = "LINK",
  Livestream = "LIVESTREAM",
  Mint = "MINT",
  ShortVideo = "SHORT_VIDEO",
  Space = "SPACE",
  Story = "STORY",
  TextOnly = "TEXT_ONLY",
  ThreeD = "THREE_D",
  Transaction = "TRANSACTION",
  Video = "VIDEO"
}

export default function Home() {
  const [view, setView] = useState('profiles')
  const [dashboardType, setDashboardType] = useState('dashboard')
  let { data: profiles, error: profileError, loading: loadingProfiles } = useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers
  }) as any

  let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.TopCommented,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Audio]
      }
    }
  }) as any

  let { data: publications, loading: loadingPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    }
  }) as any


  profiles = profiles?.filter(p => p.metadata?.picture?.optimized?.uri)

  publications = publications?.filter(p => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true
      return false
    }
    return true
  })
  
  return (
    <main className="
      px-6 py-14
      sm:px-10
    ">
      <div>
        <a target="_blank" rel="no-opener" href="https://lens.xyz">
        <div className="cursor-pointer flex items-center bg-secondary text-foreground rounded-lg py-1 px-3 mb-2 max-w-[288px]">
          <p className='mr-2'>📚</p>
          <p className="text-sm">
          Learn more about Lens Protocol.
          </p>
          <ArrowRight className='ml-2' size={14} />
        </div>
        </a>
        <h1 className="text-5xl font-bold mt-3">
          Social Explorer
        </h1>
        <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          An application boilerplate built with a modern stack. Simple to get started building your first social app. Leveraging ShadCN, Lens Protocol, Next.js, and WalletConnect.
        </p>
      </div>

      <div className="mt-[70px] flex ml-2">
        <div>
          <Button
            variant="ghost"
            onClick={() => setDashboardType('dashboard')}
            className={
            `${dashboardType !== 'dashboard' ? 'opacity-60' : '' }`
          }>My dashboard</Button>
        </div>
        <div className="ml-4">
        <Button
          variant="ghost"
          onClick={() => setDashboardType('algorithms')}
          className={
            `${dashboardType !== 'recommendation algorithms' ? 'opacity-50' : '' }`
          }>Choose your algorithm</Button>
        </div>
      </div>

      {
        dashboardType === 'algorithms' && (
          <div className='md:flex min-h-[300px] mt-3 px-6'>
            <p>Choose your algorithm coming soon...</p>
        </div>
        )
      }
      {
        dashboardType === 'dashboard' && (      <div className='md:flex min-h-[300px] mt-3'>
        <div className="border border rounded-tl rounded-bl md:w-[230px] pt-3 px-2 pb-8 flex-col flex">
          <p className='font-medium ml-4 mb-2 mt-1'>Social Views</p>
          <Button
            onClick={() => setView('profiles')}
           variant={view === 'profiles' ? 'secondary': 'ghost'} className="justify-start mb-1">
            <PersonStanding size={16} />
            <p className="text-sm ml-2">Profiles</p>
          </Button>
          <Button
            onClick={() => setView('publications')}
            variant={view === 'publications' ? 'secondary': 'ghost'} className="justify-start mb-1">
            <Newspaper size={16} />
            <p className="text-sm ml-2">Publications</p>
          </Button>
          <Button
            onClick={() => setView('music')}
            variant={view === 'music' ? 'secondary': 'ghost'} 
            className="justify-start mb-1">
            <ListMusic size={16} />
            <p className="text-sm ml-2">Music</p>
          </Button>
          <Button
            onClick={() => setView('collect')}
            variant={view === 'collect' ? 'secondary': 'ghost'} 
            className="justify-start mb-1">
            <Shapes size={16} />
            <p className="text-sm ml-2">Collect</p>
          </Button>
        </div>
        <div
          className="
          sm:border-t sm:border-r sm:border-b
          rounded-tr rounded-br flex flex-1 pb-4">
          {
            view === 'profiles' && (
              <div className="flex flex-1 flex-wrap p-4">
                {
                  loadingProfiles && (
                    <div className="
                      flex flex-1 justify-center items-center
                    ">
                      <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                  )
                }
                {
                  profiles?.map(profile => (
                    <a
                      key={profile.id}
                      className="
                      lg:w-1/4 sm:w-1/2 p-4 cursor-pointer"
                      rel="no-opener"
                      target="_blank"
                      href={`https://share.lens.xyz/u/${profile.handle.namespace}/${profile.handle.localName}`}>
                      <div className="space-y-3">
                          <div className="overflow-hidden rounded-md">
                            <img
                              className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
                              src={profile.metadata?.picture?.optimized?.uri
                            } />
                          </div>
                          <div className="space-y-1 text-sm">
                            <h3 className="font-medium leading-none">{profile.handle.localName}.{profile.handle.namespace}</h3>
                            <p className="text-xs text-muted-foreground">{profile.metadata?.displayName}</p>
                          </div>
                      </div>
                    </a>
                  ))
                }
              </div>
            )
          }
          {
            view === 'publications' && (
              <div className="flex flex-1 flex-wrap flex-col">
                {
                  loadingPubs && (
                    <div className="
                      flex flex-1 justify-center items-center
                    ">
                      <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                  )
                }
                {
                  publications?.map(publication => (
                    <div
                      className="border-b"
                      key={publication.id}
                      onClick={() => window.open(`https://share.lens.xyz/p/${publication.id}`, '_blank')}
                    >
                      <div
                      className="
                      space-y-3 mb-4 pt-6 pb-2
                      sm:px-6 px-2
                      ">
                        <div className="flex">
                          <Avatar>
                            <AvatarImage src={publication.by?.metadata?.picture?.optimized?.uri} />
                            <AvatarFallback>{publication.by.handle.localName.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                               <h3 className="mb-1 font-medium leading-none">{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
                              <p className="text-xs text-muted-foreground">{publication.by.metadata?.displayName}</p>
                          </div>
                        </div>
                        <div>
                          <img
                            className={cn(`
                            max-w-full sm:max-w-[500px]
                            rounded-2xl h-auto object-cover transition-all hover:scale-105
                            `)}
                            src={publication.__typename === 'Post' ? publication.metadata?.asset?.image?.optimized.uri : ''}
                          />
                          <ReactMarkdown className="
                          mt-4 break-words
                          ">
                            {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                          </ReactMarkdown>
                        </div>
                        <div>
                          <Button className="rounded-full mr-1"  variant="secondary" >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {publication.stats.comments}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Repeat2 className="mr-2 h-4 w-4" />
                            {publication.stats.mirrors}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Heart className="mr-2 h-4 w-4" />
                            {publication.stats.upvotes}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Grab className="mr-2 h-4 w-4" />
                            {publication.stats.collects}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
          {
            view === 'music' && (
              <div className="flex flex-1 flex-wrap flex-col">
                {
                  loadingMusicPubs && (
                    <div className="
                      flex flex-1 justify-center items-center
                    ">
                      <Loader2 className="h-12 w-12 animate-spin" />
                    </div>
                  )
                }
                {
                  musicPubs?.map(publication => (
                    <div
                      className="border-b"
                      key={publication.id}
                      onClick={() => window.open(`https://share.lens.xyz/p/${publication.id}`, '_blank')}
                    >
                      <div className="space-y-3 mb-4 p-4">
                        <div className="flex">
                          <Avatar>
                            <AvatarImage src={publication.by?.metadata?.picture?.optimized?.uri} />
                            <AvatarFallback>{publication.by.handle.fullHandle.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                              <h3 className="mb-1 font-medium leading-none">{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
                            <p className="text-xs text-muted-foreground">{publication.by.handle.fullName}</p>
                          </div>
                        </div>
                        <div>
                          <img
                             className={cn(`
                             max-w-full sm:max-w-[500px] mb-3
                             rounded-2xl h-auto object-cover transition-all hover:scale-105
                             `)}
                            src={publication.__typename === 'Post' ?
                            publication.metadata?.asset?.cover?.optimized?.uri ?
                            publication.metadata?.asset?.cover?.optimized?.uri :
                            publication.metadata?.asset?.cover?.optimized?.raw?.uri : ''}
                          />
                          <audio controls>
                            <source
                              type={publication.metadata?.asset?.audio?.optimized?.mimeType}
                              src={publication.metadata?.asset?.audio?.optimized?.uri}
                            />
                          </audio>
                          <ReactMarkdown className="
                          mt-4 break-words
                          ">
                            {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                          </ReactMarkdown>
                        </div>
                        <div>
                          <Button className="rounded-full mr-1"  variant="secondary" >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {publication.stats.comments}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Repeat2 className="mr-2 h-4 w-4" />
                            {publication.stats.mirrors}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Heart className="mr-2 h-4 w-4" />
                            {publication.stats.upvotes}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Grab className="mr-2 h-4 w-4" />
                            {publication.stats.collects}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>)
      }
    </main>
  )
}
