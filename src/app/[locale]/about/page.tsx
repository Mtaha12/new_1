import { redirect } from 'next/navigation';

type PageProps = {
  params: { locale: string };
};

export default function AboutPage({ params }: PageProps) {
  redirect(`/${params.locale}#about`);
}