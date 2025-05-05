import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Markdown text is required' },
        { status: 400 }
      );
    }

    // サーバーサイドでzenn-markdown-htmlを使用
    const markdownModule = await import('zenn-markdown-html');
    const markdownToHtml = markdownModule.default;
    
    const html = markdownToHtml(text);
    
    return NextResponse.json({ html });
  } catch (error) {
    console.error('Markdown conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert markdown' },
      { status: 500 }
    );
  }
} 