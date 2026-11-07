import siteData from "~/config/data/data";

export default function useSEO(pageTitle = '', description = '', image = '') {
    if (!pageTitle) pageTitle = siteData.meta.name;
    if (!description) description = siteData.meta.description;
    if (!image) image = siteData.meta.image;

    const canonicalUrl = `${siteData.meta.siteUrl}${useRoute().path}`;
    const socialImage = new URL(image, siteData.meta.siteUrl).toString();

    useSeoMeta({
        title: pageTitle,
        ogTitle: pageTitle,
        description: description,
        ogDescription: description,
        ogUrl: canonicalUrl,
        ogImage: socialImage,
        twitterCard: 'summary_large_image',
        twitterTitle: pageTitle,
        twitterDescription: description,
        twitterImage: socialImage,
        twitterCreator: siteData.name,
    });

    useHead({
        script: [{type: 'application/ld+json', innerHTML: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'Person',
            name: 'Tanvir Rahman', url: siteData.meta.siteUrl,
            sameAs: siteData.socials.map(item => item.link),
            alumniOf: [{'@type': 'CollegeOrUniversity', name: 'University of Tasmania'}, {'@type': 'CollegeOrUniversity', name: 'University of Greenwich'}],
            address: {'@type': 'PostalAddress', addressLocality: 'Launceston', addressRegion: 'Tasmania', addressCountry: 'AU'},
        })}],
        link: [
            {rel: 'canonical', href: canonicalUrl},
        ],
        titleTemplate: (titleChunk) => {
            if (!titleChunk) return siteData.name;
            return titleChunk.includes(siteData.name) ? titleChunk : `${titleChunk} - ${siteData.name}`;
        }
    });
}
