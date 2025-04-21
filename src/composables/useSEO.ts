import siteData from "~/config/data";

export default function useSEO(pageTitle = '', description = '', image = '/favicon.ico') {

    if (!pageTitle) pageTitle = siteData.name
    if (!description) description = siteData.meta_description
    if (!image) image = siteData.profile

    useHead({
        title: pageTitle,
        // titleTemplate: '%s - ' + appStore.site.site_name,
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - ${siteData.name}` : siteData.name;
        },
        meta: [
            {name: 'title', content: pageTitle},
            {name: 'description', content: description},
            {hid: 'image', property: 'image', content: image},
            {property: 'og:title', content: pageTitle},
            {name: 'og:description', content: description},
            {hid: 'og:image', property: 'og:image', content: image},
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:title', content: pageTitle},
            {name: 'twitter:description', content: description},
            {name: 'twitter:image', content: image},
            {name: 'twitter:creator', content: siteData.name}
        ],
    })

    // useServerSeoMeta({})
    // useSeoMeta({
    //   title: pageTitle + ' - ' + appStore.site.site_name,
    //   description: description || '',
    //   ogTitle: pageTitle + ' - ' + appStore.site.site_name,
    //   ogDescription: description,
    //   ogImage: image || '',
    //   ogUrl: window.location.href,
    //   twitterTitle: pageTitle + ' - ' + appStore.site.site_name,
    //   twitterDescription: description,
    //   twitterImage: image,
    //   twitterCard: 'summary',
    // })
}