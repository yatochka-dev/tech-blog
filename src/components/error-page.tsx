"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Copy,
  RefreshCw,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  errorCode?: number;
  errorMessage?: string;
}

export default function ErrorPage({
  error,
  reset,
  errorCode = 500,
  errorMessage = "Something went wrong",
}: ErrorPageProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch with dark mode
  useEffect(() => {
    setMounted(true);
  }, []);

  const errorDetails = error?.stack || error?.message || errorMessage;
  const errorDigest = error?.digest ? `Error digest: ${error.digest}` : "";

  const handleCopyError = () => {
    const textToCopy = `Error ${errorCode}: ${errorMessage}\n\n${errorDetails}\n\n${errorDigest}`;
    void navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-color-background flex min-h-screen w-full flex-col items-center justify-center p-4 transition-colors duration-200">
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          className="bg-color-card border-color-border overflow-hidden rounded-xl border shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-color-border border-b p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <AlertTriangle className="text-destructive h-6 w-6" />
                </div>
              </div>
              <div>
                <h1 className="text-color-foreground mb-2 text-xl font-bold sm:text-2xl">
                  Error {errorCode}
                </h1>
                <p className="text-color-muted text-base sm:text-lg">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <p className="text-muted-foreground mb-4">
                We encountered an issue while processing your request.
              </p>

              <div className="relative">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-color-card text-color-muted hover:bg-color-accent flex w-full items-center justify-between rounded-lg p-3 text-left text-sm font-medium shadow-lg transition-colors"
                >
                  <span>{error?.message}</span>
                  {/*{expanded ? (*/}
                  {/*  <ChevronUp className="text-color-accent h-4 w-4" />*/}
                  {/*) : (*/}
                  {/*  <ChevronDown className="text-color-accent h-4 w-4" />*/}
                  {/*)}*/}
                </button>

                {/*{expanded && (*/}
                {/*  <motion.div*/}
                {/*    initial={{ opacity: 0, height: 0 }}*/}
                {/*    animate={{ opacity: 1, height: "auto" }}*/}
                {/*    exit={{ opacity: 0, height: 0 }}*/}
                {/*    transition={{ duration: 0.3 }}*/}
                {/*    className="mt-2"*/}
                {/*  >*/}
                {/*    <div className="bg-color-background border-color-border max-h-60 overflow-y-auto rounded-md border p-3">*/}
                {/*      <pre className="text-color-foreground font-mono text-xs break-words whitespace-pre-wrap">*/}
                {/*        {errorDetails}*/}
                {/*        {errorDigest && (*/}
                {/*          <>*/}
                {/*            {"\n\n"}*/}
                {/*            {errorDigest}*/}
                {/*          </>*/}
                {/*        )}*/}
                {/*      </pre>*/}
                {/*    </div>*/}
                {/*  </motion.div>*/}
                {/*)}*/}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleCopyError}
                className="bg-color-card hover:bg-color-accent text-color-foreground border-color-border flex items-center justify-center gap-2 rounded-lg border px-4 py-2 font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Error</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="bg-color-primary hover:bg-color-primary/90 text-color-primary-foreground flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>

          {/*<div className="px-6 sm:px-8 py-4 bg-color-background/50 border-t border-color-border">*/}
          {/*  <p className="text-sm text-color-muted">*/}
          {/*    If this issue persists, please contact our support team.*/}
          {/*  </p>*/}
          {/*</div>*/}
        </motion.div>
      </div>
    </div>
  );
}
