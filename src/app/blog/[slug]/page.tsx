import { redirect } from 'next/navigation';

export const dynamic = 'force-static';
export const revalidate = false;

type ArticleRedirectProps = {
  params: {
    slug: string;
  };
};

export default function BlogArticleRedirect({ params }: ArticleRedirectProps) {
  redirect(`/en/blog/${params.slug}`);
}
