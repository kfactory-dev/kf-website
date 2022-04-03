import { useEffect, useState } from 'react'

export interface LeverPosting {
  id: string
  text: string
  hostedUrl: string
  // ...
}

export function useLeverPostings(site: string): LeverPosting[] | undefined {
  const [postings, setPostings] = useState<LeverPosting[] | undefined>()
  useEffect(() => {
    ;(async () => {
      const url = `https://api.lever.co/v0/postings/${site}?mode=json`
      const response = await fetch(url)
      const postings = await response.json()
      setPostings(postings)
    })()
  }, [site])
  return postings
}
