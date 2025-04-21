import siteData from "~/config/data";

export default function useSEO(pageTitle = '', description = '', image = '/favicon.ico') {

    if (!pageTitle) pageTitle = siteData.name;
    if (!description) description = siteData.meta_description;
    if (!image) image = siteData.profile;

    useSeoMeta({
        title: pageTitle,
        ogTitle: pageTitle,
        description: description,
        ogDescription: description,
        ogImage: image,
        twitterCard: 'summary_large_image',
        twitterTitle: pageTitle,
        twitterDescription: description,
        twitterImage: image,
        twitterCreator: siteData.name,
    });

    useHead({
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - ${siteData.name}` : siteData.name;
        }
    });
}