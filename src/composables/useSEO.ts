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
        link: [
            {rel: 'canonical', href: canonicalUrl},
        ],
        titleTemplate: (titleChunk) => {
            if (!titleChunk) return siteData.name;
            return titleChunk.includes(siteData.name) ? titleChunk : `${titleChunk} - ${siteData.name}`;
        }
    });
}
