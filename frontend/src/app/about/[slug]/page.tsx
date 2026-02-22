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
  <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
    
    {/* Soft Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-100/40 blur-[120px] rounded-full -z-10" />

    <div className="max-w-4xl mx-auto px-4 md:px-6">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
        {blog.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-slate-500 mb-10">
        {new Date(blog.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Cover Image */}
      {coverImage && (
        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
          {coverImage.startsWith("data:") ? (
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
     <article className="
  prose 
  prose-lg 
  md:prose-xl 
  max-w-none 
  prose-slate
  !text-slate-800
  prose-p:!text-slate-800
  prose-li:!text-slate-800
  prose-headings:!text-slate-900
">
  {blog.content}
</article>

    </div>
  </section>
); }
