"use client";

import { useState, useRef } from "react";
import { Paperclip, ArrowRight, FileText, X } from "lucide-react";

export function AnalysisInput({ onSubmit }: { onSubmit?: (query: string, file?: File | null) => void }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div 
        className={`relative overflow-hidden rounded-[24px] border bg-card shadow-sm transition-all duration-300 ${
          isFocused ? "border-primary shadow-elegant" : "border-border"
        }`}
      >
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Describe your legal situation or ask a question..."
          className="w-full resize-none bg-transparent p-6 text-[18px] text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[140px]"
        />

        {/* Action Bar */}
        <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-3">
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />
            {selectedFile ? (
              <div className="flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-[14px] font-medium text-primary">
                <FileText className="h-4 w-4" />
                <span className="max-w-[150px] truncate">{selectedFile.name}</span>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="ml-1 rounded-full p-0.5 hover:bg-primary/20 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Paperclip className="h-4 w-4" />
                Upload Document
              </button>
            )}
            <p className="text-[12px] text-muted-foreground hidden sm:block">
              PDF, DOCX, TXT up to 10MB
            </p>
          </div>

          <button 
            disabled={!query.trim() && !selectedFile}
            onClick={() => onSubmit?.(query, selectedFile)}
            className="flex h-10 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Case
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          "Review my employment contract",
          "Analyze this rental agreement",
          "What are my rights as a tenant?",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setQuery(suggestion);
              onSubmit?.(suggestion);
            }}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <FileText className="h-3.5 w-3.5" />
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
