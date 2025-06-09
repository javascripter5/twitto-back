import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { readFileSync, writeFile } from "fs"
import { GnewsDto, Gnews_categories, Gnews_countries } from './gnews-api';
import { PostsService } from "../posts.service";
import { newsDataIo_categories, newsDataIo_countries } from "./newsDataIo-api";
import { MediaStackDto, mediaStack_categories, mediaStack_countries } from "./mediaStackApi";
import { CreatePostDto } from "../dto/create-post.dto";
import { REQUEST } from "@nestjs/core";
import { SettingsService } from "src/modules/settings/settings.service";
const gnews_apikey_array =
    [
        '2fd5771df96392ec22ca698e0ce35eab',// enterprise plan js.egypt.js
        '825bad2c5819854f9e1c9d508f6e34b8',
        '465361d4d47a10c5000a90c66278eae8',
        '70cff653021493b58fb24be3197a0f7d',
        //ribepad305@mcenb.com
        'e85a5e7a90b7de4a257486b7513a786d',
        //vahewe8027@jalunaki.com
        'dcbc07820d38c934d05200a8155e0ee5',
        //ceviyop451@jalunaki.com
        '4bc8e2366843ee8f54c80c1aa926b8bf',
        //jekav68542@jalunaki.com
        'c40840ddfaf7f8996bc4983254ea94b1',
        //mipeho1630@getmola.com
        '84208a60d78ea507d95ec308ff43607e',
        //coxipe2897@gyxmz.com
        '080707b34017e5d621678e50593b6b0a',
        //ritafe5794@getmola.com
        '2bad778220f07fe2b6eafd88b953341f',
        //wimedib507@hupoi.com
        '4313a9faada12ab15ee860e7d4156add',
        //fonosos338@lanxi8.com
        'de4ed7af4fcf97f6bdd6f604f0251b95',
        //rajef97164@jalunaki.com
        '46d0d7391c01404cf310d12f4850149f',
        //kesobal262@gearstag.com
        '7fa0462f3fd6bc1cb519a1ed141e40db',
        //bidow11516@mcenb.com
        'c7b9c2fc66723708748e895f41517bb8',
        //wabig17764@gyxmz.com
        '9b6774c521be2c81780cb306aed63922',
        //latipa3500@getmola.com
        'f9ca5575c79a267fc2fcc30b2a212220',
        //hipip16631@gearstag.com
        '3cdf60ad8512b04eaf4514ce9ecd8413',
        //jabacik935@gyxmz.com
        '14b2af9045bdd1e61569a7a315859f27',
        //kijin41226@lanxi8.com
        'e4bf3dd7968eec907a11115169be1cc8',
        //baydegispu@gufum.com
        'a7f2b8bdb803b374ecf90766f74c53a7',
        //luydekelmi@gufum.com
        '351b4eb375770b47210ed492d72e4621',
        //lerdudoyda@gufum.com
        '54d050438b42fe91060c66a2cfb9d5f9',
        //hulmagerzi@gufum.com
        '4dcc7b226ad6812b3511b910fc99575a',
        //dalmohofye@gufum.com
        'fd4b1a714f1676885d1e252ffe2853d8',
        //kordatiknu@gufum.com
        '1856d8066d7747736258cb874097f799',
        //mikniyukna@gufum.com
        'fabf8a50c5c7e71d7f6ce6ed6f5f8393',
        //jimlololme@gufum.com
        '2c2e9c62af45407302ce01681b8b3731',
        //lispimelta@gufum.com
        'dcbbdcaa07ff70eeecca2d504b92750b',
    ]
const newsDataIoApiKey_array = [
    `pub_328785fb4978b4ac33962796ebdfb94b4b52d`,
    'pub_3411665cb6103820a3b74c006f333d5e8928a',
    'pub_34121a0cbefbd01b1a7154e2d04fcb3991050',
    'pub_34123671002d5742f4b82deb087006f115d45'
]
const mediaApiKey_array = [
    '936ed574d9e6b7b1298d82444a59b4a5',
    '6a7be1f56fd809879ec1e13ca4e6877f',
    '1598408764ef88561762ea793ccbd6fb',
    '64825d86f4e417d5085b6add0b27d140'
]
const theNewsApi_array = [
    'uHW0VlVtBzZ67zgMhTHPPTyyapJKHgqXLAFmjmJy'
]

let flagJob = true
@Injectable()
export class ReStructureService {
    constructor(
        private postService: PostsService,
        private settingService: SettingsService
        // @Inject(REQUEST) private request: Request

    ) { }

    async onModuleInit() {
        const minute = 1000 * 60
        setInterval(async () => {
            console.log("____cron job");
            try {

                // await this.mediaStackRequest()
            } catch (error) {

            }
            try {

                // await this.newsDataIoRequests()
            } catch (error) {

            }
            try {
                // await this.gNewsRequest()

            } catch (error) {
                console.log(error);

            }
        }, minute * 5 /* 14.5*/)

        // const allArticles = JSON.parse(readFileSync("articles.json") as any)
        // const availableArticles = allArticles.filter((article: Post) => { if (article.title != null && (article.image_url != null || article.video_url) && article.content != null) return article })
        // const uniqueArticles = [...new Map(availableArticles.map(item => [item["title"], item])).values()];

        // await this.postService.create(uniqueArticles)

    }


    async gNewsRequest() {
        flagJob = false
        let allArticles: CreatePostDto[] = []
        // const countries = Object.keys(Gnews_countries)
        const gnews_apikey = (await this.settingService.findOne(1)).currentToken || "2fd5771df96392ec22ca698e0ce35eab"
        for (const key in Gnews_countries) {
            // const [gnews_apikey] = gnews_apikey_array
            // gnews_apikey_array.push(gnews_apikey_array.shift());

            const element = Gnews_countries[key];
            const apiQuery = {
                // q: "q=mt+rainier",
                // category: "nation",
                country: element.code,
                apikey: gnews_apikey,
                page: 1,
                expand: "content",
                // lang: "ar",
                max: 100,
            }
            //?w="100%"&h="100%"
            let url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.nation, ...apiQuery as any })}`
            const { articles: artticles_nation } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(artticles_nation, [Gnews_categories.nation], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.sports, ...apiQuery as any })}`
            const { articles: articles_sports } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_sports, [Gnews_categories.sports], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.entertainment, ...apiQuery as any })}`
            const { articles: articles_entertainment } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_entertainment, [Gnews_categories.entertainment], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.technology, ...apiQuery as any })}`
            const { articles: articles_technology } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_technology, [Gnews_categories.technology], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.business, ...apiQuery as any })}`
            const { articles: articles_business } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_business, [Gnews_categories.business], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.general, ...apiQuery as any })}`
            const { articles: articles_general } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_general, [Gnews_categories.general], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.health, ...apiQuery as any })}`
            const { articles: articles_health } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_health, [Gnews_categories.health], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.science, ...apiQuery as any })}`
            const { articles: articles_science } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_science, [Gnews_categories.science], [element.code]))
            url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.world, ...apiQuery as any })}`
            const { articles: articles_world } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_Gnews(articles_world, [Gnews_categories.world], [element.code]))
            const uniqueArticles = [...new Map(allArticles.map(item => [item["title"], item])).values()];
            await this.postService.create(uniqueArticles)
            allArticles = []

        }
        // writeFile('articles.txt', JSON.stringify(allArticles), () => { });
        // writeFile('articles.json', JSON.stringify(allArticles), () => { });

        flagJob = true
    }
    async mediaStackRequest() {
        const allArticles: CreatePostDto[] = []
        for (const key in mediaStack_countries) {
            const [mediaStackApiKey] = mediaApiKey_array
            mediaApiKey_array.push(mediaApiKey_array.shift());

            const element = mediaStack_countries[key];
            const apiQuery = {
                country: element.code,
                "access_key": mediaStackApiKey,
            }
            let url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.science, ...apiQuery as any })}`
            const { data: artticles_science } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(artticles_science, [mediaStack_categories.science], [element.code]))
            url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.sports, ...apiQuery as any })}`
            const { data: articles_sports } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(articles_sports, [mediaStack_categories.sports], [element.code]))
            url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.entertainment, ...apiQuery as any })}`
            const { data: articles_entertainment } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(articles_entertainment, [mediaStack_categories.entertainment], [element.code]))
            url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.technology, ...apiQuery as any })}`
            const { data: articles_technology } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(articles_technology, [mediaStack_categories.technology], [element.code]))
            url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.business, ...apiQuery as any })}`
            const { data: articles_business } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(articles_business, [mediaStack_categories.business], [element.code]))
            url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.general, ...apiQuery as any })}`
            const { data: articles_general } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(articles_general, [mediaStack_categories.general], [element.code]))
            url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ categories: mediaStack_categories.health, ...apiQuery as any })}`
            const { data: articles_health } = await (await fetch(url, { cache: "no-cache" })).json()
            allArticles.push(...this.structure_mediaStack(articles_health, [mediaStack_categories.health], [element.code]))

        }
        // writeFile('articles.txt', JSON.stringify(allArticles), () => { });
        // writeFile('articles.json', JSON.stringify(allArticles), () => { });

        const uniqueArticles = [...new Map(allArticles.map(item => [item["title"], item])).values()];
        await this.postService.create(uniqueArticles)
    }

    structure_mediaStack(articles: MediaStackDto[], category: string[], country: string[], language?: string): CreatePostDto[] {
        const posts: CreatePostDto[] = [];
        if (!articles) return posts
        for (const element of articles) {
            let checkExist = element.description && element.image && element.title
            // if (!checkExist) console.log("not found");

            if (checkExist) posts.push({
                content: element.description,
                description: element.description,
                image_url: element.image,
                title: element.title,
                link: element.url,
                pubDate: element.published_at,
                language: element.language,
                creator: [element.source],
                source_id: element.source,
                keywords: [...category, element.source],
                category: category,
                country: country,
            })
        }
        return posts
    }
    structure_Gnews(articles: GnewsDto[], category: string[], country: string[], language?: string): CreatePostDto[] {
        const posts: CreatePostDto[] = [];
        if (!articles) return posts
        for (const element of articles) {
            let checkExist = element.content && element.image && element.title
            // if (!checkExist) console.log("not found");

            if (checkExist) posts.push({
                content: element.content,
                description: element.description,
                image_url: element.image,
                title: element.title,
                link: element.url,
                pubDate: element.publishedAt,
                language: language,
                creator: [element.source.name],
                source_id: element.source.name,
                keywords: [...category, element.source.name],
                category: category,
                country: country,
            })
        }
        return posts
    }


    async newsDataIoRequests() {
        const allArticles: CreatePostDto[] = []
        for (const key in newsDataIo_countries) {
            const currentArticles = []
            const [newsDataIoApiKey] = newsDataIoApiKey_array
            newsDataIoApiKey_array.push(newsDataIoApiKey_array.shift());

            const element = newsDataIo_countries[key];
            const apiQuery = {
                // q: "q=mt+rainier",
                // category: "nation",
                country: element.code,
                apikey: newsDataIoApiKey
                // language: "ar",
                // size: 50,
            }
            //?w="100%"&h="100%"
            let url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.business, ...apiQuery as any })}`
            const { results: articles_business } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_business)) currentArticles.push(...articles_business)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.crime, ...apiQuery as any })}`
            const { results: articles_crime } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_crime)) currentArticles.push(...articles_crime)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.domestic, ...apiQuery as any })}`
            const { results: articles_domestic } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_domestic)) currentArticles.push(...articles_domestic)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.education, ...apiQuery as any })}`
            const { results: articles_education } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_education)) currentArticles.push(...articles_education)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.entertainment, ...apiQuery as any })}`
            const { results: articles_entertainment } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_entertainment)) currentArticles.push(...articles_entertainment)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.environment, ...apiQuery as any })}`
            const { results: articles_environment } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_environment)) currentArticles.push(...articles_environment)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.food, ...apiQuery as any })}`
            const { results: articles_food } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_food)) currentArticles.push(...articles_food)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.health, ...apiQuery as any })}`
            const { results: articles_health } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_health)) currentArticles.push(...articles_health)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.other, ...apiQuery as any })}`
            const { results: articles_other } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_other)) currentArticles.push(...articles_other)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.politics, ...apiQuery as any })}`
            const { results: articles_politics } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_politics)) currentArticles.push(...articles_politics)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.science, ...apiQuery as any })}`
            const { results: articles_science } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_science)) currentArticles.push(...articles_science)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.sports, ...apiQuery as any })}`
            const { results: articles_sports } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_sports)) currentArticles.push(...articles_sports)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.technology, ...apiQuery as any })}`
            const { results: articles_technology } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_technology)) currentArticles.push(...articles_technology)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.top, ...apiQuery as any })}`
            const { results: articles_top } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_top)) currentArticles.push(...articles_top)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.tourism, ...apiQuery as any })}`
            const { results: articles_tourism } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_tourism)) currentArticles.push(...articles_tourism)
            url = `https://newsdata.io/api/1/news?${new URLSearchParams({ category: newsDataIo_categories.world, ...apiQuery as any })}`
            const { results: articles_world } = await (await fetch(url, { cache: "no-cache" })).json()
            if (Array.isArray(articles_world)) currentArticles.push(...articles_world)

            const availableArticles = currentArticles.filter((article: CreatePostDto) => { if (article.title != null && (article.image_url != null || article.video_url) && article.content != null) { article.country = [element.code]; return article } })
            allArticles.push(...availableArticles)
        }
        writeFile('articles.txt', JSON.stringify(allArticles), () => { });
        writeFile('articles.json', JSON.stringify(allArticles), () => { });

        const uniqueArticles = [...new Map(allArticles.map(item => [item["title"], item])).values()];
        await this.postService.create(uniqueArticles)
    }
}