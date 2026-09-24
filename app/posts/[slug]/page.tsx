import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug, type PostFrontmatter } from "@/lib/blog";
import TraceTable from "@/components/zk/TraceTable";
import LieAmplification from "@/components/zk/LieAmplification";
import FriFolding from "@/components/zk/FriFolding";
import ScalingChart from "@/components/zk/ScalingChart";
import ProofPipeline from "@/components/zk/ProofPipeline";

const rehypePrettyCodeOptions = {
  theme: "github-dark",
};

// Interactive figures posts can drop into their MDX by name.
const mdxComponents = {
  TraceTable,
  LieAmplification,
  FriFolding,
  ScalingChart,
  ProofPipeline,
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX<PostFrontmatter>({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:pl-32">
        <Link
          href="/posts/"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 mb-8 inline-block"
        >
          ← back to posts
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-2">
            {post.frontmatter.title}
          </h1>
          <time
            className="text-sm text-accent"
            dateTime={post.frontmatter.date}
          >
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              // Frontmatter dates are plain YYYY-MM-DD, which parse as UTC
              // midnight; format in UTC so they don't shift a day back.
              timeZone: "UTC",
            })}
          </time>
        </header>

        <article className="post-content">{content}</article>
      </div>
    </div>
  );
}
