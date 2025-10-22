
import React, { useState } from 'react';
import { ASPECT_RATIOS } from '../constants';
import { AspectRatio } from '../types';

interface AdGeneratorFormProps {
  isLoading: boolean;
  onSubmit: (description: string, url: string, aspectRatio: AspectRatio) => void;
}

const AdGeneratorForm: React.FC<AdGeneratorFormProps> = ({ isLoading, onSubmit }) => {
  const [description, setDescription] = useState('A durable, waterproof, and stylish backpack for daily commutes and weekend hikes. Features a laptop sleeve and multiple compartments.');
  const [url, setUrl] = useState('https://example.com/products/urban-explorer-backpack');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description && url) {
      onSubmit(description, url, aspectRatio);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition"
          placeholder="e.g., A stylish and durable backpack for modern commuters."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
          Product URL
        </label>
        <input
          type="url"
          name="url"
          id="url"
          className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition"
          placeholder="https://example.com/product"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-300 mb-2">
          Image Aspect Ratio
        </label>
        <select
          id="aspect-ratio"
          name="aspect-ratio"
          className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
          disabled={isLoading}
        >
          {ASPECT_RATIOS.map((ratio) => (
            <option key={ratio} value={ratio}>
              {ratio}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Ads'
        )}
      </button>
    </form>
  );
};

export default AdGeneratorForm;
