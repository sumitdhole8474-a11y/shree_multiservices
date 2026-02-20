import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/app/services/blog.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AboutBlogDetailPage({ params }: Props) {
  // ✅ await params (your existing logic kept)
  const { slug } = await params;

  console.log("SLUG:", slug);

  const blog = await getBlogBySlug(slug);
  console.log("BLOG:", blog);

  if (!blog) {
    notFound();
  }

  // ✅ Base64 + Normal Path Support (ONLY CHANGE)
  const coverImage = blog.cover_image
    ? blog.cover_image.startsWith("data:")
      ? blog.cover_image
      : blog.cover_image.startsWith("/")
      ? blog.cover_image
      : `/${blog.cover_image}`
    : null;

  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        {blog.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-400 mb-8">
        {new Date(blog.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Cover Image */}
      {coverImage && (
        <div className="relative w-full h-[420px] mb-10 rounded-xl overflow-hidden">
          {coverImage.startsWith("data:") ? (
            // Base64 must use normal img
            <img
              src={coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none text-gray-700">
        {blog.content}
      </article>
    </section>
  );
}
