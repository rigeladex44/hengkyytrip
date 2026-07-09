import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const section = searchParams.get('section');

  if (!section) {
    return NextResponse.json({ error: 'Section parameter is required' }, { status: 400 });
  }

  try {
    // Construct path to public/images/[section]
    const directoryPath = path.join(process.cwd(), 'public', 'images', section);
    
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
       return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(directoryPath);
    
    // Filter out non-image files (like .DS_Store)
    const imageFiles = files.filter(file => 
      file.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)$/)
    );

    // Map to public URLs
    const imageUrls = imageFiles.map(file => `/images/${section}/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error(`Error reading directory for section ${section}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
