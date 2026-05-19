import { createGroq } from '@ai-sdk/groq'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import fs from 'fs'
import path from 'path'

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const knowledge = fs.readFileSync(
    path.join(process.cwd(), 'src/data/about-me.md'),
    'utf-8'
  )

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: `You are a portfolio assistant for Joshua Verceles.
Only answer questions about this person. Be friendly and conversational.
Here is everything about them:\n\n${knowledge}`,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}