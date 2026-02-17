import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/app/services/blog.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AboutBlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const coverImage =
    blog.cover_image?.startsWith("/")
      ? blog.cover_image
      : blog.cover_image
      ? `/${blog.cover_image}`
      : null;

  return (
    <main className="bg-white text-black">
      <section className="max-w-5xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-500">
            Published on{" "}
            {new Date(blog.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </header>

        {/* Cover Image */}
        {coverImage && (
          <div className="relative w-full h-[460px] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={coverImage}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article
          className="
            prose 
            prose-lg 
            max-w-none 
            prose-headings:text-black
            prose-p:text-gray-800
            prose-strong:text-black
            prose-li:text-gray-800
            prose-a:text-blue-600
            prose-a:font-semibold
            prose-a:no-underline
            hover:prose-a:underline
          "
        >
          {blog.content}
        </article>
      </section>
    </main>
  );
}
