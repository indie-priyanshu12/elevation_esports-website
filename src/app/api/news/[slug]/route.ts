import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import { NewsPost } from "@/lib/db/models";
import { requireAdminAuth } from "@/lib/auth/guard";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectToDatabase();
    const post = await NewsPost.findOne({ slug }).lean();
    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching news post" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { slug } = await params;
    const body = await request.json();
    await connectToDatabase();

    // Whitelist fields to prevent MongoDB operator injection
    const { title, summary, content, cover_image_url, is_published, published_at } = body;
    const updateData = { title, summary, content, cover_image_url, is_published, published_at };

    const updatedPost = await NewsPost.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true }
    );
    if (!updatedPost) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ message: "Error updating news post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { slug } = await params;
    await connectToDatabase();
    const deletedPost = await NewsPost.findOneAndDelete({ slug });
    if (!deletedPost) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting news post" }, { status: 500 });
  }
}
