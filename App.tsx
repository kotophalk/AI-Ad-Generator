
import React, { useState } from 'react';
import AdGeneratorForm from './components/AdGeneratorForm';
import AdDisplay from './components/AdDisplay';
import SparklesIcon from './components/icons/SparklesIcon';
import { generateAdImage } from './services/geminiService';
import { AspectRatio } from './types';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerate = async (description: string, url: string, aspectRatio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateAdImage(description, url, aspectRatio);
      setGeneratedImageUrl(imageUrl);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-indigo-900/30 text-white">
      <main className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-[400px] lg:w-[450px] flex-shrink-0 bg-gray-900/50 backdrop-blur-sm border-r border-white/10 shadow-2xl p-6 md:p-8 overflow-y-auto">
          <div className="flex items-center mb-6">
            <SparklesIcon className="w-8 h-8 text-indigo-400 mr-3" />
            <h1 className="text-2xl font-bold">AI Ad Generator</h1>
          </div>
          <p className="text-gray-400 mb-8">
            Describe your product, and let AI create a stunning, high-quality banner image for you.
          </p>
          <AdGeneratorForm isLoading={isLoading} onSubmit={handleGenerate} />
        </div>

        <div className="flex-grow flex items-center justify-center">
          <AdDisplay
            isLoading={isLoading}
            error={error}
            imageUrl={generatedImageUrl}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
