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
      setError("Failed to generate QR code. Please try again.");
      setQrCodeData(undefined);
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
    setQrCodeData(undefined);
    setError(null);
  };

  const downloadQRCodeImage = async () => {
    if (!qrCodeData) {
      return;
    }

    const a = document.createElement("a");
    a.download = "qrcode.png";
    a.href = qrCodeData;
    a.click();
  };

  return (
    <div className="flex flex-col flex-1 items-center min-h-screen justify-center font-sans bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 text-white">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center text-center gap-8 py-8 px-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl uppercase font-bold font-mono tracking-tight">QR Code Generator</h1>
          <p className='text-xl max-w-sm'>
            No registration or data tracking. Just create and get your <span className="uppercase font-bold tracking-tighter">QR Code</span>.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-sm">
          {error && <p className="text-red-500 font-medium">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <TextInput
              placeholder={"Your data/URL here"}
              value={text}
              onChange={handleTextChange}
              maxLength={2000}
              disabled={isGenerating}
            />
          </form>

          <Button type="button" onClick={getQRCode} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>

        {qrCodeData && (
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={qrCodeData}
              alt="Generated QR Code"
              width={250}
              height={250}
            />
            <Button type="button" onClick={downloadQRCodeImage}>Download</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
