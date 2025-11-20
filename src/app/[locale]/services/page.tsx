"use client";

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FloatingCTA from '@/components/ui/FloatingCTA';

type Pillar = {
	icon?: string;
	title: string;
	description: string;
};

type ServiceCard = {
	id: string;
	title: string;
	summary: string;
	ctaLabel: string;
	highlights: string[];
	href: string;
};

export default function ServicesPage() {
	const t = useTranslations('ServicesOverview');
	const pathname = usePathname() ?? '/en';
	const params = useParams<{ locale?: string }>();
	const localeFromParams = params?.locale;
	const currentLocale = (Array.isArray(localeFromParams) ? localeFromParams[0] : localeFromParams) || pathname.split('/')[1] || 'en';
	const localePrefix = `/${currentLocale}`;
	const heroTitle = t('heroTitle');
	const heroSubtitle = t('heroSubtitle');
	const heroSupporting = t('heroSupporting');
	const primaryCta = t('primaryCta');
	const primaryCtaHref = t('primaryCtaHref');
	const secondaryCta = t('secondaryCta');
	const secondaryCtaHref = t('secondaryCtaHref');
	const pillars = (t.raw('pillars') as Pillar[]) || [];
	const services = (t.raw('services') as ServiceCard[]) || [];
	const servicesTitle = t('servicesTitle');
	const servicesDescription = t('servicesDescription');
	const ctaTitle = t('ctaTitle');
	const ctaSubtitle = t('ctaSubtitle');
	const ctaPrimary = t('ctaPrimary');
	const ctaPrimaryHref = t('ctaPrimaryHref');
	const ctaSecondary = t('ctaSecondary');
	const ctaSecondaryHref = t('ctaSecondaryHref');
	const supportTitle = t('supportTitle');
	const supportSummary = t('supportSummary');

	const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

	const buildHref = (href: string) => {
		if (!href) return '#';
		if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
			return href;
		}
		const normalized = href.startsWith('/') ? href : `/${href}`;
		return `${localePrefix}${normalized}`;
	};

	const serviceMedia: Record<string, { image: string; badge: string; accent: string }> = {
		consulting: { image: '/img/s1.jpg', badge: '🤝', accent: 'linear-gradient(135deg, rgba(9, 31, 90, 0.85) 0%, rgba(19, 70, 163, 0.8) 100%)' },
		infrastructure: { image: '/img/s5.jpg', badge: '🏗️', accent: 'linear-gradient(135deg, rgba(8, 25, 70, 0.85) 0%, rgba(15, 98, 160, 0.8) 100%)' },
		resourcing: { image: '/img/s8.jpg', badge: '🛡️', accent: 'linear-gradient(135deg, rgba(7, 31, 95, 0.85) 0%, rgba(45, 214, 198, 0.8) 100%)' },
		training: { image: '/img/s6.jpg', badge: '🧪', accent: 'linear-gradient(135deg, rgba(5, 20, 82, 0.85) 0%, rgba(102, 224, 255, 0.8) 100%)' },
		'managed-it': { image: '/img/s9.jpg', badge: '🧰', accent: 'linear-gradient(135deg, rgba(4, 13, 60, 0.85) 0%, rgba(61, 169, 219, 0.78) 100%)' },
		devsecops: { image: '/img/s11.jpg', badge: '⚙️', accent: 'linear-gradient(135deg, rgba(11, 31, 96, 0.65) 0%, rgba(105, 232, 225, 0.4) 100%)' },
		managed: { image: '/img/s9.jpg', badge: '🧰', accent: 'linear-gradient(135deg, rgba(4, 13, 60, 0.85) 0%, rgba(61, 169, 219, 0.78) 100%)' },
		managedIt: { image: '/img/s9.jpg', badge: '🧰', accent: 'linear-gradient(135deg, rgba(4, 13, 60, 0.85) 0%, rgba(61, 169, 219, 0.78) 100%)' }
	};

	const curatedResources = [
		{
			title: 'Building Zero-Trust Programs That Scale',
			tag: 'Whitepaper',
			image: '/img/resource1.jpg',
			href: buildHref('/resources/zero-trust')
		},
		{
			title: 'Cyber Workforce Readiness Playbook 2025',
			tag: 'Playbook',
			image: '/img/resource2.jpg',
			href: buildHref('/resources/workforce')
		},
		{
			title: 'Modernizing Managed SOC Operations',
			tag: 'Case Study',
			image: '/img/resource3.jpg',
			href: buildHref('/resources/managed-soc')
		}
	];

	return (
		<div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<main style={{ flex: 1 }}>
			<section
				className="parallax-wrap fade-section"
				style={{
					background: 'linear-gradient(135deg, rgba(4, 12, 40, 0.96) 0%, rgba(12, 47, 108, 0.9) 55%, rgba(19, 104, 255, 0.78) 100%)',
					padding: 'clamp(4rem, 9vw, 7rem) clamp(1.5rem, 6vw, 3.5rem)',
					color: '#fff',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'radial-gradient(circle at 20% 30%, rgba(105, 232, 225, 0.28) 0%, transparent 55%)',
						pointerEvents: 'none'
					}}
				/>
				<div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>
					<div className="fade-section delay-1" style={{ display: 'grid', gap: 'clamp(2rem, 5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', alignItems: 'center' }}>
						<div>
							<h1
								style={{
									fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
									fontWeight: 800,
									marginBottom: '1.25rem',
									lineHeight: 1.1
								}}
							>
								{heroTitle}
							</h1>
							<p
								className="fade-section delay-2"
								style={{
									fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
									lineHeight: 1.8,
									opacity: 0.92,
									marginBottom: '1.5rem'
								}}
							>
								{heroSubtitle}
							</p>
							<p
								className="fade-section delay-3"
								style={{
									fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
									opacity: 0.85,
									lineHeight: 1.7,
									marginBottom: '2.5rem'
								}}
							>
								{heroSupporting}
							</p>
							<div
								className="fade-section delay-4"
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '1rem',
									justifyContent: 'flex-start'
								}}
							>
								<Link
									className="glow-button hero-cta delay-1"
									href={buildHref(primaryCtaHref)}
									prefetch={false}
									style={{
										background: '#69E8E1',
										color: '#0a0e3d',
										padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
										borderRadius: '30px',
										fontWeight: 700,
										fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
										textDecoration: 'none',
										boxShadow: '0 15px 38px rgba(105, 232, 225, 0.25)'
									}}
								>
									{primaryCta}
								</Link>
								<Link
									className="glow-button hero-cta delay-2"
									href={buildHref(secondaryCtaHref)}
									prefetch={false}
									style={{
										background: 'transparent',
										color: '#fff',
										border: '2px solid rgba(255,255,255,0.68)',
										padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
										borderRadius: '30px',
										fontWeight: 600,
										fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
										textDecoration: 'none'
									}}
								>
									{secondaryCta}
								</Link>
							</div>
						</div>
						<div className="tilt-card fade-section delay-2" style={{ position: 'relative', minHeight: '320px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 45px 75px rgba(5, 12, 40, 0.35)' }}>
							<Image src="/img/s7.jpg" alt={heroTitle} fill priority sizes="(max-width: 768px) 100vw, 540px" style={{ objectFit: 'cover' }} />
							<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,12,40,0) 0%, rgba(4,12,40,0.65) 100%)' }} />
							<div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
								{supportTitle}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				className="fade-section delay-2"
				style={{
					padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
				}}
			>
				<div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
				<h2
					className="fade-section delay-1"
					style={{
							fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
							fontWeight: 800,
							color: '#0a0e3d',
							marginBottom: 'clamp(2rem, 6vw, 3rem)',
							textAlign: 'center'
						}}
				>
					{t('pillarsTitle')}
				</h2>
				<div
					className="fade-section delay-2"
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
						gap: 'clamp(1.5rem, 4vw, 2.5rem)'
					}}
				>
					{pillars.map((pillar, index) => (
						<div
							className={`tilt-card glow-card gradient-border rise-in delay-${(index % 5) + 1}`}
							key={index}
							style={{
								background: '#fff',
								borderRadius: '18px',
								padding: '2rem',
								border: '1px solid rgba(10,14,61,0.08)',
								boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)'
							}}
						>
							{pillar.icon && (
								<div
									style={{
										width: '56px',
										height: '56px',
										borderRadius: '14px',
										background: '#0a0e3d',
										color: '#69E8E1',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '1.6rem',
										marginBottom: '1.25rem'
									}}
								>
									{pillar.icon}
								</div>
							)}
							<h3
								style={{
									fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
									fontWeight: 700,
									color: '#0a0e3d',
									marginBottom: '0.75rem'
								}}
							>
								{pillar.title}
							</h3>
							<p style={{ color: '#555', lineHeight: 1.7 }}>{pillar.description}</p>
						</div>
					))}
				</div>
				</div>
			</section>

			<section
				className="fade-section delay-2"
				style={{
					padding: 'clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 3.5rem)',
					background: '#f4f7ff'
				}}
			>
				<div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
					<h3 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0a0e3d', marginBottom: '1rem', textAlign: 'center' }}>
						{t('navigationTitle') ?? 'Explore our capabilities'}
					</h3>
					<p style={{ color: '#4d5566', textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
						{t('navigationSubtitle') ?? 'Jump straight into the service that fits your current initiative.'}
					</p>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
						{services.map((service, index) => (
							<Link
								key={`${service.id}-nav`}
								href={buildHref(service.href)}
								prefetch={false}
								className={`service-card tilt-card hover-glow delay-${(index % 4) + 1}`}
								style={{
									background: serviceMedia[service.id]?.accent ?? 'linear-gradient(135deg, rgba(10,15,70,0.85) 0%, rgba(14,58,120,0.8) 100%)',
									padding: '1.75rem',
									borderRadius: '20px',
									color: '#fff',
									textDecoration: 'none',
									display: 'flex',
									flexDirection: 'column',
									gap: '1.1rem'
								}}
							>
								<div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem' }}>
									{serviceMedia[service.id]?.badge ?? '⭐'}
								</div>
								<div>
									<h4 style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', fontWeight: 700, marginBottom: '0.4rem' }}>{service.title}</h4>
									<p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, fontSize: 'clamp(0.85rem, 1.4vw, 0.98rem)', margin: 0 }}>
										{service.summary}
									</p>
								</div>
								<span className="link-arrow" style={{ marginTop: 'auto', fontWeight: 600, fontSize: '0.95rem' }}>
									{t('viewServiceLabel') ?? 'View service'}
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section
				className="fade-section delay-3"
				style={{
					background: '#0a0e3d',
					padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)'
				}}
			>
				<div
					className="fade-section delay-1"
					style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', textAlign: 'center' }}
				>
					<h2
						style={{
							fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
							fontWeight: 800,
							color: '#fff',
							marginBottom: '1rem'
						}}
					>
						{servicesTitle}
					</h2>
					<p
						className="fade-section delay-2"
						style={{
							color: 'rgba(255,255,255,0.75)',
							maxWidth: '760px',
							margin: '0 auto clamp(2.5rem, 6vw, 3.5rem)',
							lineHeight: 1.8,
							fontSize: 'clamp(0.98rem, 1.6vw, 1.05rem)'
						}}
					>
						{servicesDescription}
					</p>
					<div
						className="fade-section delay-2"
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
							gap: 'clamp(1.8rem, 4vw, 2.6rem)'
						}}
					>
						{services.map((service, index) => (
							<div
								className={`tilt-card glow-card gradient-border rise-in delay-${(index % 5) + 1}`}
								key={service.id}
								style={{
									background: '#fff',
									borderRadius: '24px',
									overflow: 'hidden',
									display: 'flex',
									flexDirection: 'column',
									height: '100%'
								}}
							>
								<div style={{ position: 'relative', width: '100%', height: '220px' }}>
									<Image
										src={serviceMedia[service.id]?.image ?? '/img/s2.jpg'}
										alt={service.title}
										fill
										sizes="(max-width: 768px) 100vw, 420px"
										style={{ objectFit: 'cover' }}
									/>
									<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,12,40,0) 30%, rgba(4,12,40,0.7) 100%)' }} />
									<div style={{ position: 'absolute', top: '1.1rem', left: '1.2rem', width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.9rem', color: '#fff' }}>
										{serviceMedia[service.id]?.badge ?? '🌐'}
									</div>
								</div>
								<div style={{ padding: 'clamp(1.8rem, 5vw, 2.2rem)', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
									<h3 style={{ fontSize: 'clamp(1.2rem, 2.1vw, 1.45rem)', fontWeight: 800, color: '#0a0e3d', marginBottom: '0.35rem' }}>
										{service.title}
									</h3>
									<p style={{ color: '#4d5566', lineHeight: 1.7 }}>
										{service.summary}
									</p>
									<ul
										style={{
											listStyle: 'none',
											padding: 0,
											margin: 0,
											display: 'grid',
											gap: '0.55rem',
											color: '#4d5566',
											textAlign: 'left'
										}}
									>
										{service.highlights.map((item, idx) => (
											<li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
												<span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69E8E1', display: 'inline-block' }} />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
								<div style={{ padding: '0 1.8rem 1.8rem' }}>
									<Link
										href={buildHref(service.href)}
										prefetch={false}
										className="glow-button hero-cta"
										style={{
											display: 'inline-block',
											background: '#0a0e3d',
											color: '#fff',
											padding: '0.85rem 2.4rem',
											borderRadius: '28px',
											fontWeight: 600,
											fontSize: '0.95rem',
											textDecoration: 'none'
										}}
									>
										{service.ctaLabel}
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				className="fade-section delay-4"
				style={{
					padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
					background: '#fff'
				}}
			>
				<div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
					<h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0a0e3d', textAlign: 'center', marginBottom: '1rem' }}>
						{t('resourcesTitle') ?? 'Resources to accelerate your roadmap'}
					</h3>
					<p style={{ color: '#4d5566', textAlign: 'center', maxWidth: '760px', margin: '0 auto clamp(2.5rem, 6vw, 3.5rem)', lineHeight: 1.8 }}>
						{t('resourcesSubtitle') ?? 'Hand-picked guides and case studies from our service teams to help you plan ahead.'}
					</p>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
						{curatedResources.map((resource, index) => {
							const card = (
								<div
									className={`resource-card tilt-card delay-${(index % 3) + 1}`}
									style={{
										background: '#0a0e3d',
										borderRadius: '18px',
										overflow: 'hidden',
										boxShadow: '0 20px 40px rgba(5, 12, 40, 0.18)',
										height: '250px'
									}}
								>
									<div className="resource-card__media" style={{ position: 'relative', width: '100%', height: '100%' }}>
										<Image src={resource.image} alt={resource.title} fill sizes="(max-width: 768px) 100vw, 320px" style={{ objectFit: 'cover' }} />
									</div>
								</div>
							);

							return resource.href ? (
								<Link key={resource.title} href={resource.href} prefetch={false} style={{ textDecoration: 'none' }}>
									{card}
								</Link>
							) : (
								<div key={resource.title}>{card}</div>
							);
						})}
					</div>
				</div>
			</section>

			<FloatingCTA
				title={ctaTitle}
				description={ctaSubtitle}
				primaryLabel={ctaPrimary}
				primaryHref={buildHref(ctaPrimaryHref)}
				backgroundGradient="linear-gradient(180deg, #f8f9fa 0%, #f8f9fa 60%, #050b3d 60%, #050b3d 100%)"
			/>

			</main>
			<Footer />
		</div>
	);
}
