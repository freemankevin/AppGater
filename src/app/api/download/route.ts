import { NextRequest, NextResponse } from 'next/server';
import toolsData from '@/data/tools.json';
import { Tool } from '@/lib/types';

export const runtime = 'edge';
export const preferredRegion = 'all';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('id');

    if (!toolId) {
      return NextResponse.json(
        { error: 'Missing tool ID' },
        { status: 400 }
      );
    }

    // 查找工具
    const tools = toolsData as Tool[];
    const tool = tools.find((t) => t.id === toolId);

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    // 检查工具状态
    if (tool.healthStatus === 'offline') {
      return NextResponse.json(
        { error: 'Tool is currently unavailable' },
        { status: 503 }
      );
    }

    return NextResponse.redirect(tool.official, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Download-Source': 'AppGater',
        'X-Tool-Id': tool.id,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 支持 HEAD 请求用于预检
export async function HEAD(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('id');

    if (!toolId) {
      return new NextResponse(null, { status: 400 });
    }

    const tools = toolsData as Tool[];
    const tool = tools.find((t) => t.id === toolId);

    if (!tool) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Tool-Status': tool.healthStatus || 'unknown',
        'X-Tool-Name': encodeURIComponent(tool.name),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
