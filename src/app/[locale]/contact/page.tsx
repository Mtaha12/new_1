'use client';

import ContactForm from '@/components/contacts/ContactForm';
import Header from '@/components/layout/Header';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
	const t = useTranslations('Contact');

	return (
		<div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
			<Header />
			
			{/* Hero Section */}
			<section className="parallax-wrap fade-section" style={{
				background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
				padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
				textAlign: 'center',
				color: '#fff'
			}}>
				<h1 style={{
					fontSize: 'clamp(2rem, 5vw, 3rem)',
					fontWeight: '800',
					marginBottom: '1rem'
				}}>
					{t('title')}
				</h1>
				<p style={{
					fontSize: 'clamp(1rem, 2vw, 1.2rem)',
					opacity: 0.9,
					maxWidth: '600px',
					margin: '0 auto'
				}}>
					{t('description')}
				</p>
			</section>

			{/* Contact Form Section */}
			<section className="fade-section delay-2" style={{
				padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
				maxWidth: '1200px',
				margin: '0 auto'
			}}>
				<div className="rise-in delay-2">
					<ContactForm />
				</div>
			</section>

			{/* Contact Info Section */}
			<section className="fade-section delay-3" style={{
				background: '#0a0e3d',
				padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)',
				color: '#fff'
			}}>
				<div style={{
					maxWidth: '1200px',
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
					gap: 'clamp(2rem, 4vw, 3rem)',
					textAlign: 'center'
				}}>
					<div>
						<div className="rise-in delay-1" style={{
							fontSize: '3rem',
							marginBottom: '1rem'
						}}>📍</div>
						<h3 style={{
							fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
							fontWeight: '700',
							marginBottom: '0.5rem'
						}}>
							Office Location
						</h3>
						<p style={{
							color: '#ccc',
							fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
						}}>
							123 Business Street<br />
							City, State 12345
						</p>
					</div>

					<div>
						<div className="rise-in delay-2" style={{
							fontSize: '3rem',
							marginBottom: '1rem'
						}}>📞</div>
						<h3 style={{
							fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
							fontWeight: '700',
							marginBottom: '0.5rem'
						}}>
							Phone
						</h3>
						<p style={{
							color: '#ccc',
							fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
						}}>
							+1 (555) 123-4567<br />
							+1 (555) 987-6543
						</p>
					</div>

					<div>
						<div className="rise-in delay-3" style={{
							fontSize: '3rem',
							marginBottom: '1rem'
						}}>✉️</div>
						<h3 style={{
							fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
							fontWeight: '700',
							marginBottom: '0.5rem'
						}}>
							Email
						</h3>
						<p style={{
							color: '#ccc',
							fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
						}}>
							info@thesamurai.com<br />
							support@thesamurai.com
						</p>
					</div>

					<div>
						<div className="rise-in delay-4" style={{
							fontSize: '3rem',
							marginBottom: '1rem'
						}}>🕐</div>
						<h3 style={{
							fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
							fontWeight: '700',
							marginBottom: '0.5rem'
						}}>
							Business Hours
						</h3>
						<p style={{
							color: '#ccc',
							fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'
						}}>
							Mon - Fri: 9:00 AM - 6:00 PM<br />
							Sat - Sun: Closed
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
