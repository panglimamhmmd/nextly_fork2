import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { Benefits } from '@/components/Benefits';
import { Video } from '@/components/Video';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { Cta } from '@/components/Cta';

import { benefitOne, benefitTwo } from '@/components/data';

export default function Home() {
    return (
        <Container>
            <SectionTitle
                preTitle="Nextly Benefits"
                title=" Why should you use this landing page"
            >
                Nextly is a free landing page & marketing website template for
                startups and indie projects. Its built with Next.js &
                TailwindCSS. And its completely open-source.
            </SectionTitle>
        </Container>
    );
}
