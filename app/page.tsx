"use client";

import { useState, SubmitEvent } from "react";
import Image from "next/image";
import { generateQR } from "@/utils/qrcode";
import { Button, Footer, TextInput } from "@/components";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [qrCodeData, setQrCodeData] = useState<string | undefined>();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const getQRCode = async () => {
    if (!text.trim()) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const data = await generateQR(text);
      setQrCodeData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    getQRCode();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setError(null);
  };

  const downloadQRCodeImage = () => {
    if (!qrCodeData) {
      return;
    }

    const a = document.createElement("a");
    a.download = "qrcode.png";
    a.href = qrCodeData;
    a.click();
  };

  const copyQRCodeImage = async () => {
    if (!qrCodeData) {
      return;
    }

    try {
      const response = await fetch(qrCodeData);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(qrCodeData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setError("Failed to copy QR code to clipboard.");
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center min-h-screen justify-center font-sans bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 text-white">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center text-center gap-8 py-8 px-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl uppercase font-bold font-mono tracking-tight">QR Code Generator</h1>
          <p className="text-xl max-w-sm">
            No registration or data tracking. Just create and get your <span className="uppercase font-bold tracking-tighter">QR Code</span>.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-sm">
          {error && (
            <p role="alert" aria-live="assertive" className="text-red-400 font-medium text-sm">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="qr-input" className="sr-only">
              Data or URL to encode in QR code
            </label>
            <TextInput
              id="qr-input"
              name="qr-content"
              aria-label="Enter URL or text to generate QR code"
              placeholder={"Your data/URL here"}
              value={text}
              onChange={handleTextChange}
              maxLength={2000}
              disabled={isGenerating}
              required
            />
            <Button
              type="submit"
              disabled={isGenerating || !text.trim()}
              aria-busy={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </form>
        </div>

        {qrCodeData && (
          <section
            aria-label="Generated QR Code Result"
            aria-live="polite"
            className="flex flex-col gap-4 items-center"
          >
            <div className="p-3 bg-white rounded-lg shadow-xl">
              <Image
                src={qrCodeData}
                alt={`Generated QR Code for ${text}`}
                width={250}
                height={250}
                priority
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={downloadQRCodeImage}
                aria-label="Download QR Code as PNG image"
              >
                Download
              </Button>
              <Button
                type="button"
                onClick={copyQRCodeImage}
                aria-label="Copy QR Code image to clipboard"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
