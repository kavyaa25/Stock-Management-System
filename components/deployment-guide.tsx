"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeploymentGuide() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(id)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  return (
    <Card className="card-hover border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Deployment Guide</CardTitle>
        <CardDescription>Follow these steps to deploy your Stock Management System on Netlify</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="step1">
            <AccordionTrigger className="text-lg font-medium">Step 1: Prepare Your Project</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Before deploying, make sure your project is ready:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensure all features are working correctly in development</li>
                <li>Update any environment variables needed for production</li>
                <li>Create a production build of your application</li>
              </ul>

              <div className="bg-muted p-3 rounded-md relative">
                <pre className="text-sm overflow-x-auto">
                  <code>npm run build</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => copyToClipboard("npm run build", "build")}
                >
                  {copiedCommand === "build" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step2">
            <AccordionTrigger className="text-lg font-medium">Step 2: Set Up Netlify</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Create a Netlify account and connect your repository:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Sign up or log in to{" "}
                  <a
                    href="https://www.netlify.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Netlify <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
                <li>Click "New site from Git"</li>
                <li>Connect to your GitHub, GitLab, or Bitbucket account</li>
                <li>Select your repository</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step3">
            <AccordionTrigger className="text-lg font-medium">Step 3: Configure Build Settings</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Configure your build settings in Netlify:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Build command:</strong> <code>npm run build</code>
                </li>
                <li>
                  <strong>Publish directory:</strong> <code>out</code> (for Next.js static export) or <code>.next</code>{" "}
                  (for Next.js SSR)
                </li>
              </ul>

              <p className="mt-4">
                Create a <code>_redirects</code> file in your public folder for client-side routing:
              </p>
              <div className="bg-muted p-3 rounded-md relative">
                <pre className="text-sm overflow-x-auto">
                  <code>/* /index.html 200</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => copyToClipboard("/* /index.html 200", "redirects")}
                >
                  {copiedCommand === "redirects" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step4">
            <AccordionTrigger className="text-lg font-medium">Step 4: Environment Variables</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Add your environment variables in Netlify:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Go to Site settings > Build & deploy > Environment</li>
                <li>Add variables needed for your application</li>
                <li>
                  Remember to prefix client-side variables with <code>NEXT_PUBLIC_</code>
                </li>
              </ol>

              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium mb-2">Example environment variables:</p>
                <pre className="text-sm overflow-x-auto">
                  <code>NEXT_PUBLIC_API_URL=https://your-backend-api.com</code>
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step5">
            <AccordionTrigger className="text-lg font-medium">Step 5: Deploy</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>Deploy your site:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Click "Deploy site" in Netlify</li>
                <li>Wait for the build process to complete</li>
                <li>Your site will be available at a Netlify subdomain (e.g., your-site.netlify.app)</li>
                <li>You can set up a custom domain in the "Domain settings" section</li>
              </ol>

              <div className="mt-4 p-4 bg-primary/10 rounded-md">
                <p className="font-medium">Continuous Deployment</p>
                <p className="text-sm mt-1">
                  Netlify automatically rebuilds and deploys your site when you push changes to your repository.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

