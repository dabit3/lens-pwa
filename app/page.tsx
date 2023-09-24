'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  PublicationTypes,
  PublicationSortCriteria,
  PublicationMainFocus,
  useReaction,
  useActiveProfile,
  ReactionType
} from '@lens-protocol/react-web'
import {
  Loader2,
  ListMusic,
  Newspaper,
  PersonStanding,
  Shapes,
  Share,
  Globe,
  MessageSquare,
  Repeat2,
  Heart,
  Grab,
  ArrowRight
} from "lucide-react"
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from 'react-markdown'
import {useWallets} from '@privy-io/react-auth';

export default function Home() {
  // const [view, setView] = useState('profiles')
  // const [dashboardType, setDashboardType] = useState('dashboard')
  // let { data: profiles, loading: loadingProfiles } = useExploreProfiles({
  //   limit: 50
  // }) as any

  // const { data: profile } = useActiveProfile()

  // let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
  //   limit: 25,
  //   sortCriteria: PublicationSortCriteria.CuratedProfiles,
  //   publicationTypes: [PublicationTypes.Post],
  //   metadataFilter: {
  //     restrictPublicationMainFocusTo: [PublicationMainFocus.Audio]
  //   }
  // }) as any

  // let { data: publications, loading: loadingPubs } = useExplorePublications({
  //   limit: 25,
  //   sortCriteria: PublicationSortCriteria.CuratedProfiles,
  //   publicationTypes: [PublicationTypes.Post],
  //   metadataFilter: {
  //     restrictPublicationMainFocusTo: [PublicationMainFocus.Image]
  //   }
  // }) as any

  // profiles = profiles?.filter(p => p.picture?.original?.url)

  // publications = publications?.filter(p => {
  //   if (p.metadata && p.metadata.media[0]) {
  //     if (p.metadata.media[0].original.mimeType.includes('image')) return true
  //     return false
  //   }
  //   return true
  // })

  // const {wallets} = useWallets();
  // const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  // const embeddedWalletAddress = embeddedWallet?.address;




  
  return (
    <main className="
      px-6 py-14
      sm:px-10
    ">
      <div>
      {/* <div className="
          flex
          text-foreground mb-2">
            <div className="
            cursor-pointer items-center 
            flex grow-0 bg-secondary py-1 px-3 rounded-lg ">
              <p className="text-sm">
              {embeddedWalletAddress ? embeddedWalletAddress : "Connect Wallet"}
              </p>
            </div>
      </div> */}
        <h1 className="text-5xl font-bold mt-3">
          OnlySubs
        </h1>
        <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          A platform aligning incentives between creators and their fans with subscription NFTs.
        </p>
        <div className="mt-6 flex">
          <Button variant="outline" className='mr-3'>
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <a
            target="_blank"
            rel="no-opener" href="/search"
            className={buttonVariants({ variant: "default" })}>
            <Globe className="h-4 w-4 mr-1 text-white" />
            <p className="text-white">Explore Creators</p>
          </a>
        </div>
      </div>

    </main>
  )
}