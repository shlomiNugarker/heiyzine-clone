import { NextRequest, NextResponse } from 'next/server'

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // NOTE: PDF processing is done client-side in PDFUploader component
    // This endpoint validates the file and could be extended to:
    // - Store file in cloud storage (S3, Cloudflare R2)
    // - Save metadata to database
    // - Process with external service
    // For now, it returns success to indicate file is valid

    return NextResponse.json({
      success: true,
      message: 'PDF file validated successfully',
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
      },
    })

  } catch (error) {
    console.error('PDF upload error:', error)

    return NextResponse.json(
      {
        error: 'Failed to process PDF upload',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET method for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'PDF upload API is running',
    maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
  })
}
