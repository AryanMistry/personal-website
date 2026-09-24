import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:pl-32">
        <div className="text-sm sm:text-base md:text-lg text-accent mb-3 font-semibold break-words">
          <span className="text-text-primary">root@kali</span>:<span className="text-accent">~</span>$ cat posts/
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold gradient-text mb-10">posts</h1>

        <ul className="space-y-8">
          {posts.length === 0 ? (
            <li className="text-text-secondary text-sm">No posts yet.</li>
          ) : (
            posts.map((post) => (
              <li key={post.slug} className="border-b border-border pb-8 last:border-0">
                <Link
                  href={`/posts/${post.slug}/`}
                  className="group block"
                >
                  <h2 className="text-lg font-semibold text-text-primary group-hover:text-text-secondary transition-colors duration-150 mb-2">
                    {post.title}
                  </h2>
                  <time className="text-xs text-accent block mb-2" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      // Frontmatter dates are plain YYYY-MM-DD, which parse as
                      // UTC midnight; format in UTC so they don't shift a day back.
                      timeZone: "UTC",
                    })}
                  </time>
                  {post.description && (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
